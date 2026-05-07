// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title GrantOpsLiveConfigRegistryV2
/// @notice Public proof registry for GrantOps Sentinel's live privileged config scanner.
/// @dev This contract stores project metadata and emits scanner capability/version events.
contract GrantOpsLiveConfigRegistryV2 {
    struct ProjectProof {
        string name;
        string demoUrl;
        string githubUrl;
        string milestone;
        string scannerScope;
        uint256 createdAt;
        uint256 updatedAt;
    }

    string public constant PRODUCT = "GrantOps Sentinel";
    string public constant VERSION = "2.0.0-live-privileged-config";
    string public constant SCANNER_SCOPE =
        "owner,admin,implementation,paused,eip1967,safe-threshold,safe-owners";

    address public owner;
    ProjectProof[] private proofs;

    event ProofRegistered(
        uint256 indexed proofId,
        string name,
        string demoUrl,
        string githubUrl,
        string milestone,
        string scannerScope
    );

    event ProofUpdated(
        uint256 indexed proofId,
        string name,
        string demoUrl,
        string githubUrl,
        string milestone,
        string scannerScope
    );

    event ScannerVersionAnnounced(
        string product,
        string version,
        string scannerScope,
        string demoUrl,
        string githubUrl
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor(
        string memory demoUrl,
        string memory githubUrl
    ) {
        owner = msg.sender;

        emit ScannerVersionAnnounced(
            PRODUCT,
            VERSION,
            SCANNER_SCOPE,
            demoUrl,
            githubUrl
        );
    }

    function registerProof(
        string calldata name,
        string calldata demoUrl,
        string calldata githubUrl,
        string calldata milestone
    ) external returns (uint256 proofId) {
        proofId = proofs.length;

        proofs.push(
            ProjectProof({
                name: name,
                demoUrl: demoUrl,
                githubUrl: githubUrl,
                milestone: milestone,
                scannerScope: SCANNER_SCOPE,
                createdAt: block.timestamp,
                updatedAt: block.timestamp
            })
        );

        emit ProofRegistered(
            proofId,
            name,
            demoUrl,
            githubUrl,
            milestone,
            SCANNER_SCOPE
        );
    }

    function updateProof(
        uint256 proofId,
        string calldata name,
        string calldata demoUrl,
        string calldata githubUrl,
        string calldata milestone
    ) external onlyOwner {
        require(proofId < proofs.length, "Proof does not exist");

        ProjectProof storage proof = proofs[proofId];
        proof.name = name;
        proof.demoUrl = demoUrl;
        proof.githubUrl = githubUrl;
        proof.milestone = milestone;
        proof.scannerScope = SCANNER_SCOPE;
        proof.updatedAt = block.timestamp;

        emit ProofUpdated(
            proofId,
            name,
            demoUrl,
            githubUrl,
            milestone,
            SCANNER_SCOPE
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

