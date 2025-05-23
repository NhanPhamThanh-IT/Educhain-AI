// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EduToken is ERC20 {
    constructor() ERC20('EduToken', 'EDT') {
        _mint(msg.sender, 10000000 * 10 ** 18);
    }
}