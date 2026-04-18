// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script} from "forge-std/Script.sol";
import {TrustDrop} from "../src/TrustDrop.sol";

contract DeployScript is Script {
    function run() external returns (TrustDrop deployed) {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerKey);
        deployed = new TrustDrop();
        vm.stopBroadcast();
    }
}
