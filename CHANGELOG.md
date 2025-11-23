# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.6.1](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/compare/v0.6.0...v0.6.1) (2025-11-23)


### Bug Fixes

* correct changelog XML structure in release notes (GL-7) ([1657998](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/1657998b3e3d9ff938d1ec134ffb3f05747c21b8))

## [0.6.0](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/compare/v0.5.0...v0.6.0) (2025-11-23)


### Features

* add date input field for changelogs (GL-13) ([8bf363b](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/8bf363bd28ece1c457d322bb039540fa330e65df))
* add validation store and helper functions (GL-18) ([dd1eba5](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/dd1eba51ed52b605791f1485b48bb9adf20747fb))
* define validation rules of identification and release notes (GL-18) ([c106f0a](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/c106f0aa7d86d0cfc632c404c3d87e03b182293b))
* implement validators for release notes and identification (GL-18) ([ac71083](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/ac710834bf8481237230fe8e3d545790e0ce4c04))
* integrate zod validation handling in form components (GL-18) ([58635c9](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/58635c9ef4318e503a39543244f4374d0649c38c))
* use zod validation before building (GL-18) ([84db7be](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/84db7be9b3692b1ddc436a210822287284c2ac93))
* wrap state and remarks in group to display as row (GL-13) ([384a34b](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/384a34bd327334ec04af7ffd1cd5b58b6821103f))


### Bug Fixes

* change button texts to english (GL-14) ([2d4b3a0](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/2d4b3a073aff0ad367ba07729cd1573823d6be17))
* loading spinner to remove when done (GL-14) ([50bbafb](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/50bbafb3293e881c985f60ddf5f472e7ab00248c))


### Code Refactoring

* add debug flag for debug action buttons and include export loading spinner (GL-14) ([c48cc81](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/c48cc818a37419d718944db710c52068dd46de98))
* enforce each field of version number (GL-16) ([f8f995c](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/f8f995c046c82ac4006264e5c9d08460ce9a724e))
* extract all kinds of messages to constants files and move required checks from mapper to builder (GL-17) ([ee3abb5](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/ee3abb564fceae7afb5ad1b47f1caf068c6bc3d4))
* make cleaner function names and rework undefined checks (GL-16) ([a793a40](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/a793a40d6bd392585d0ae1027984b2b5d75c1fc4))
* make editor actions responsive (GL-14) ([80c6aac](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/80c6aac7cc5800d957313089ed36ef730d300395))
* remove unnecessary identification check and error message (GL-17) ([40c2959](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/40c295968f01fe2d0b674794269620e48ff40240))


### Tests

* add test to compare input and output functional profile xml files (GL-5) ([f45fad3](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/f45fad3b5755b1517fcb360e2ff0a968ddd7b4bd))


### Continuous Integration

* add test stage that runs all tests (GL-3) ([5d57cac](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/5d57cac53709acdb10110508a3f99586677661a6))


### Chores

* install zod for form-validation (GL-18) ([2a47212](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/2a47212a8df8e3b2139109cc8a15cbbbbd96a6eb))
* move debug config to root (GL-14) ([4b6dc11](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/4b6dc1159882c33c05933771efc5d4be16d9f605))


### Documentation

* update dependencies in readme (GL-18) ([3a2b713](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/3a2b713be4ede154d3e7e1e821a7807f9382d91a))

## [0.5.0](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/compare/v0.4.1...v0.5.0) (2025-11-19)


### Features

* add dropdown-menu-trigger from shadcn library (GL-14) ([4c3b835](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/4c3b8352a9d5a9ffadb201d1efa3f8f9d2c878f9))
* add form options for profile identification (GL-13) ([cdbc70f](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/cdbc70fc04af48d2740babdb99bdacf812489f75))
* add header for form group and required for the versions (GL-13) ([e0e6cd2](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/e0e6cd24847a2560534c1b78b51b7aecc2d27e4c))
* add import button in functional-profile editor (GL-14) ([55a61a2](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/55a61a27e82554c29a93b5a5797fd18a5d11635c))
* add import choices for import button (GL-14) ([59b0c60](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/59b0c60eab86100b6383535774fb86f8464c02b0))
* add optional header and description to form group (GL-11) ([aa274f7](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/aa274f7adf1d82b4634d37314e0bde0cc4562825))
* add profileidentificationform-component to to functional profil form (GL-13) ([4a1a1e0](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/4a1a1e0816eef139dc044465389bc6b60a5cfa20))
* implement builder for profile identification (GL-8) ([64c5de1](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/64c5de1e3d5d9cbe81cdc3226522974e5bd7c8c3))
* implement file upload hook and enhance error flow (GL-14) ([badff20](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/badff209ecb39895f722d332d9bae4805d61b367))
* implement functional profile builder for release notes and rename upload to import (GL-8) ([a804392](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/a8043925f9afa613ed57d62f4cb54f42c065a458))
* implement functional profile release notes mapper and add sample xml's (GL-7) ([c845278](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/c8452784df78ff1199d2947320174cbcb178f62e))
* implement mapper for profile identification and include it in sample xml files (GL-7) ([b5e17b4](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/b5e17b4a52e64fedfefcb4394cb541e6d2df4abf))
* implement state for profile identification form (GL-13) ([d418673](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/d418673ce6616c27d84b4f746bf30639cefd08b0))
* make text-field to input field to also support numbers (GL-11) ([d08febe](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/d08febef69ce5f4b1b7edfff64e2b13848bd7306))
* setup store for specification owner identification (GL-13) ([378b551](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/378b551835c9ed050bc844ede5e5e745b65fa358))
* update factory with profile identification ([786f531](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/786f53166046b92d3b4431dbb21ac1f76b92fbe7))


### Bug Fixes

* component file name (GL-13) ([1bc2a0a](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/1bc2a0ae278b704ca39b3cabadab778a26ba805e))
* position of import button and change library import (GL-14) ([085a0c0](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/085a0c05a839833155470d1a01c58cbfe4111ac0))
* remove loading spinner for exporting (GL-14) ([dffe1e3](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/dffe1e316b506d3506820568910002e31cc9a7e3))


### Chores

* temporarly remove not implemented model parts (GL-9) ([0c44d0f](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/0c44d0ffc36d34e6573b6f1272de9ac7a4e1d6df))
* update formatting (GL-13) ([f87cdf2](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/f87cdf2680e06830aa2cb0aa5933935cafdd7042))
* update packages with vulnerabilities with audit fix ([a9eb8dd](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/a9eb8dda036d5760447c58a8ccd2c673f365e1ba))

### [0.4.1](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/compare/v0.4.0...v0.4.1) (2025-11-13)


### Features

* add createSample function and debug json button (GL-14) ([6e7316e](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/6e7316e86a3be7d71b6908d75fe56ae0d31da0a1))


### Code Refactoring

* support not required form section (GL-11) ([f8edc4a](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/f8edc4a4885e6dad4760208a70b0f774d30e531a))
* use useShallow for state and set fields to undefined if empty (GL-16) ([1af3cde](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/1af3cdec87228b31dcd907e7b215454778c381a7))

## [0.4.0](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/compare/v0.3.0...v0.4.0) (2025-11-13)


### Features

* add devices and functional-profiles route (GL-6) ([c93735c](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/c93735c48d38192b90077d27a6ce5ffd3edb5847))
* add navbar to root layout (GL-6) ([ed620ab](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/ed620abf37e225c9089e4ecc3e6ea95a5864afe8))
* add navbar with the newley created logo (GL-6) ([95e639a](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/95e639a4c0db0d9ee0d8b245704799a73f518c5d))
* add required props to form components (GL-11) ([c5e2053](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/c5e2053eb10ae8962f5aede266e18e19f4ad0d96))
* create profile store and release notes slice (GL-16) ([565af07](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/565af074ee03e7569dc60513b0a812abf19eae86))
* implement changelog entries for release notes form (GL-13) ([3fc6106](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/3fc6106562c7d734f20e211a125d3a103db808f0))
* implement form group and array field components (GL-11) ([475d69e](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/475d69ec6912a20ca11dd05f2754ea414f37fb2c))
* implement form section component (GL-11) ([896d5d1](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/896d5d13149571d1326417380d1e9f762bd66ef8))
* implement layout for editor actions and form header (GL-14) ([0e2889c](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/0e2889c7ae75450bc38c6806b89544acf82002f3))
* implement optional field form component (GL-11) ([4bf58bd](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/4bf58bd3333c5ed0ec15871e8821c1a411b3d343))
* implement release notes remarks (GL-13) ([3f944c6](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/3f944c6544d5fd2b438cb7d3e67ee4dab30a7d49))
* implement release state in release notes form (GL-13) ([99deecc](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/99deecc7675b29f200431e3f6e076572005338ea))
* implement text field form component (GL-11) ([a5b5d70](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/a5b5d7004bc5d80a7f5c55c46618b2bcdf4a0b59))
* install shadcn select and implement select-field form component (GL-11) ([6f49e68](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/6f49e68a68f3743f1db90dae7a291c3caa2fc23c))
* make changelog fields required (GL-13) ([81102ad](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/81102ad47443a78c126f87cf36e1f814b4e57864))


### Code Refactoring

* reorganize store structure and integrate release notes with profile (GL-16) ([1dc3c82](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/1dc3c822c12875d2394500bed28d1d76a0eb97a4))
* simplify change handler (GL-13) ([ecc8f27](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/ecc8f2739326cd0c49939d86bb60b8d6b9b5d267))


### Chores

* add form options (GL-11) ([125104a](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/125104a4fb24e71f1a985fb37456c56da6ec1746))
* add some components from shadcn library (GL-6) ([618c6de](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/618c6de83354a63752c35bdec4ae5a4ddfef64e5))
* declare partial fp frame containing release notes, identification, alternative names and description (GL-9) ([810ae9c](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/810ae9c5bd5305004c7702069f9de4a841d9a4ae))
* install immer for immutable state updates (GL-16) ([85118fc](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/85118fc72e36b4b5dc53929f3eecb67dc3b5ccce))

## [0.3.0](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/compare/v0.2.0...v0.3.0) (2025-11-06)


### Chores

* create folder structure (GL-1) ([ef4abf1](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/ef4abf1f34f430a39a1a89241dabe77b0a7bdb08))
* install and configure husky for pre commit checks (GL-15) ([20402e9](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/20402e9a31d7851aa321dc78a2121da5370a320b))
* install xml2js, jest,  zustand and framer-motion (GL-1) ([2dc7478](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/2dc7478717ecd0aa8b5d62a85cbee3b42969d907))


### Documentation

* add dependencie descriptions to readme (GL-1) ([2cba008](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/2cba008a9697944e45649682d904d16386c388d7))
* add pages link, table of contents and minor formatting changes to readme (GL-3) ([36eb2e5](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/36eb2e5ffc732aad7980b411391a401c8c946728))
* add project structure to toc (GL-1) ([8d37c71](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/8d37c71b0dd250cbec5fb439e30c2dd8eb68cbe6))
* better commenting for steps and small format changes in readme (GL-3) ([e55aa52](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/e55aa52c4d89204baa94aeefad10af0f7990fb5d))
* describe folder structure in readme (GL-1) ([ccbf129](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/ccbf12984a22e99c4be5a553caab5c002b038735))
* describe pipeline stages and steps (GL-3) ([c8aabf5](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/c8aabf5f0afdafa63c59f67daae05fe72511d06f))
* describe pre commit checks (GL-15) ([dfe87d6](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/dfe87d67fd94768d7675bba5b5ec7f45a25a96cf))

## [0.2.0](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/compare/v0.1.1...v0.2.0) (2025-11-05)


### Chores

* add format commands and format files (GL-2) ([b5b9d54](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/b5b9d544fce90d9c9488c42458b1ca4eab9d9a89))
* install prettier for formatting and add config (GL-2) ([023ec0c](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/023ec0c72face43de8edb1f9032776f3c2eee340))


### Continuous Integration

* add gitlab-pages deployment (GL-3) ([54b7a29](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/54b7a2931e7eb336e0c35affc7d3cb9905c321f6))
* format and lint check in lint stage (GL-3) ([f4e8b4b](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/f4e8b4ba6fe298b705af9121189709a0a994ed05))

### 0.1.1 (2025-11-05)


### Chores

* add releasing commands to scripts (GL-4) ([1f6bf49](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/1f6bf49ccb12aa56d37d6ade997876049e89fec1))
* initialize nextjs project with shadcn (GL-1) ([09fce12](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/09fce12d645691db82ab0ead2aee0b18b7c73e9a))
* install standard-version and add base configuration (GL-4) ([86c4d1b](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/86c4d1bc45b0393c37d1cb029d702987d6b6905e))


### Documentation

* add releasing workflow to readme (GL-4) ([9a7c499](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/9a7c4999dd5b3df2f09938142704741ea6db6e06))
* update issue template (GL-1) ([fbe6bcf](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/fbe6bcf11f783f92c5d9d0014ce978c57ad87bb6))
* upload issue template (GL-1) ([159c069](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/159c0690cfcdd32be727c526d5374b26f3b492d1))
