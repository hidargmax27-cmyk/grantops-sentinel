// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GrantOpsProofRegistry {
    struct ProjectProof {
        string name;
        string demoUrl;
        string githubUrl;
        string milestone;
        uint256 createdAt;
    }

    address public owner;
    ProjectProof[] private proofs;

    event ProofRegistered(
        uint256 indexed proofId,
        string name,
        string demoUrl,
        string githubUrl,
        string milestone
    );

    constructor() {
        owner = msg.sender;
    }

    function registerProof(
        string calldata name,
        string calldata demoUrl,
        string calldata githubUrl,
        string calldata milestone
    ) external {
        proofs.push(
            ProjectProof({
                name: name,
                demoUrl: demoUrl,
                githubUrl: githubUrl,
                milestone: milestone,
                createdAt: block.timestamp
            })
        );

        emit ProofRegistered(
            proofs.length - 1,
            name,
            demoUrl,
            githubUrl,
            milestone
        );
    }

    function proofCount() external view returns (uint256) {
        return proofs.length;
    }

    function getProof(uint256 proofId) external view returns (ProjectProof memory) {
        require(proofId < proofs.length, "Proof does not exist");
        return proofs[proofId];
    }
}

