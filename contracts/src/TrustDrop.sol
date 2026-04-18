// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract TrustDrop {
    enum Status {
        Active,
        Completed,
        Refunded,
        Penalized
    }

    struct Commitment {
        address creator;
        address beneficiary;
        uint256 amount;
        uint256 deadline;
        string description;
        string proof;
        Status status;
        bool withdrawn;
    }

    uint256 public nextId;
    mapping(uint256 => Commitment) public commitments;

    event CommitmentCreated(
        uint256 indexed id,
        address indexed creator,
        address indexed beneficiary,
        uint256 amount,
        uint256 deadline,
        string description
    );
    event CommitmentCompleted(uint256 indexed id, string proof);
    event RefundClaimed(uint256 indexed id, address indexed creator, uint256 amount);
    event PenaltyClaimed(uint256 indexed id, address indexed beneficiary, uint256 amount);

    function createCommitment(
        string calldata description,
        uint256 deadline,
        address beneficiary
    ) external payable returns (uint256 id) {
        require(msg.value > 0, "Amount must be > 0");
        require(deadline > block.timestamp, "Deadline must be in future");
        require(beneficiary != address(0), "Invalid beneficiary");

        id = nextId++;
        commitments[id] = Commitment({
            creator: msg.sender,
            beneficiary: beneficiary,
            amount: msg.value,
            deadline: deadline,
            description: description,
            proof: "",
            status: Status.Active,
            withdrawn: false
        });

        emit CommitmentCreated(id, msg.sender, beneficiary, msg.value, deadline, description);
    }

    function submitProofAndMarkComplete(uint256 id, string calldata proof) external {
        Commitment storage commitment = commitments[id];
        require(commitment.creator != address(0), "Commitment not found");
        require(msg.sender == commitment.creator, "Only creator");
        require(block.timestamp <= commitment.deadline, "Deadline passed");
        require(commitment.status == Status.Active, "Not active");

        commitment.proof = proof;
        commitment.status = Status.Completed;

        emit CommitmentCompleted(id, proof);
    }

    function claimRefund(uint256 id) external {
        Commitment storage commitment = commitments[id];
        require(commitment.creator != address(0), "Commitment not found");
        require(msg.sender == commitment.creator, "Only creator");
        require(commitment.status == Status.Completed, "Not completed");
        require(!commitment.withdrawn, "Already withdrawn");

        commitment.withdrawn = true;
        commitment.status = Status.Refunded;

        (bool ok, ) = payable(msg.sender).call{value: commitment.amount}("");
        require(ok, "Refund transfer failed");

        emit RefundClaimed(id, msg.sender, commitment.amount);
    }

    function claimPenalty(uint256 id) external {
        Commitment storage commitment = commitments[id];
        require(commitment.creator != address(0), "Commitment not found");
        require(msg.sender == commitment.beneficiary, "Only beneficiary");
        require(block.timestamp > commitment.deadline, "Deadline not passed");
        require(commitment.status == Status.Active, "Not claimable");
        require(!commitment.withdrawn, "Already withdrawn");

        commitment.withdrawn = true;
        commitment.status = Status.Penalized;

        (bool ok, ) = payable(msg.sender).call{value: commitment.amount}("");
        require(ok, "Penalty transfer failed");

        emit PenaltyClaimed(id, msg.sender, commitment.amount);
    }

    function getCommitment(uint256 id) external view returns (Commitment memory) {
        return commitments[id];
    }
}
