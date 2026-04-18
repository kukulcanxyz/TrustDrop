// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {TrustDrop} from "../src/TrustDrop.sol";

contract TrustDropTest is Test {
    TrustDrop internal trustDrop;
    address internal creator = address(0xA11CE);
    address internal beneficiary = address(0xB0B);

    function setUp() public {
        trustDrop = new TrustDrop();
        vm.deal(creator, 10 ether);
        vm.deal(beneficiary, 10 ether);
    }

    function testCreateCommitment() public {
        vm.prank(creator);
        uint256 id = trustDrop.createCommitment{value: 1 ether}(
            "Ship Monad Blitz demo",
            block.timestamp + 1 days,
            beneficiary
        );

        (
            address storedCreator,
            address storedBeneficiary,
            uint256 amount,
            uint256 deadline,
            string memory description,
            string memory proof,
            TrustDrop.Status status,
            bool withdrawn
        ) = trustDrop.commitments(id);

        assertEq(storedCreator, creator);
        assertEq(storedBeneficiary, beneficiary);
        assertEq(amount, 1 ether);
        assertEq(deadline, block.timestamp + 1 days);
        assertEq(description, "Ship Monad Blitz demo");
        assertEq(proof, "");
        assertEq(uint8(status), uint8(TrustDrop.Status.Active));
        assertFalse(withdrawn);
    }

    function testCompleteAndRefund() public {
        vm.prank(creator);
        uint256 id = trustDrop.createCommitment{value: 1 ether}(
            "Finish pitch",
            block.timestamp + 1 days,
            beneficiary
        );

        vm.prank(creator);
        trustDrop.submitProofAndMarkComplete(id, "https://demo.app");

        uint256 creatorBalanceBefore = creator.balance;
        vm.prank(creator);
        trustDrop.claimRefund(id);

        assertEq(creator.balance, creatorBalanceBefore + 1 ether);
    }

    function testBeneficiaryClaimsPenaltyAfterDeadline() public {
        vm.prank(creator);
        uint256 id = trustDrop.createCommitment{value: 1 ether}(
            "Deploy app",
            block.timestamp + 1 days,
            beneficiary
        );

        vm.warp(block.timestamp + 1 days + 1);

        uint256 beneficiaryBalanceBefore = beneficiary.balance;
        vm.prank(beneficiary);
        trustDrop.claimPenalty(id);

        assertEq(beneficiary.balance, beneficiaryBalanceBefore + 1 ether);
    }
}
