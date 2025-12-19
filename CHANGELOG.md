# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.12.1](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/compare/v0.12.0...v0.12.1) (2025-12-19)


### Features

* add content to landing page (GL-6) ([50e6eca](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/50e6eca967175a865430885bb16f506bbd2407c8))
* add device frame and device information to model (GL-9) ([6cf921d](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/6cf921d8fd71f3416185376e3c906d2a1cdd7983))
* add library API utilities for importing functional profiles and devices (GL-10) ([bc53e55](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/bc53e55ffdd39ad243e36b6d1e99691a654172e9))
* add library import dialog component (GL-14) ([913336f](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/913336f72f6e81d58fbc27714efbf2ca613703e8))
* create device identification slice and use in store (GL-16) ([5807f63](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/5807f63e46a621ccea86e97520d08594cd330aaf))
* display identifier for imported profiles and devices ([bbdf161](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/bbdf1611b205a268a0f015a685a5de5e714cdf04))
* implement alternative names forms for devices (GL-12) ([18a3afb](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/18a3afbe5a91b1a38be7b96f5b2e3da038aeb12d))
* implement device alternative names in device information slice (GL-16) ([f178d6c](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/f178d6c76e676cd324e87767f575efdfca040ef4))
* implement device editor and empty form (GL-14) ([d728604](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/d728604f45745bdcc858ee29ce874831985a98db))
* implement device identification form (GL-12) ([cdac577](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/cdac5774b24e75734fbf8d16d78d5df2d6db3775))
* implement device store and create empty factory method (GL-16) ([1f0a26a](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/1f0a26a49cf20e11dc4d4cf998e95a0ba1aa5009))
* implement generic attributes forms for data points (GL-13) ([10274cd](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/10274cddf97a37993b55f82b5af34c6ab8234860))
* implement generic attributes slice for datapoints (GL-16) ([f72d20b](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/f72d20b0744ed3f9c59fb3351915479347052bd6))
* implement legible descriptions form for device information (GL-12) ([8d4e106](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/8d4e106efe3e770b7cd3faec912f489436accc89))
* implement legible descriptions slice for device information (GL-16) ([28d0fe6](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/28d0fe653aeb9314d2fa94f57ac4cd278a28b755))
* implement modal to import from library (GL-10) ([ec330a6](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/ec330a64f9060a5a228ef7aefe397e4010932775))
* import dialog component for library import modal (GL-10) ([d3fbaac](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/d3fbaac4d99bddb13fe06c1374585e6b3efc403c))
* include library-import-modal ([a7bd531](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/a7bd53166f9031174379363899ef191871637abc))
* integrate library import into functional profile and device editor (GL-14) ([90fb558](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/90fb558a74e62ddf62c7787a21e50176dffc5fa8))


### Bug Fixes

* add guard to check for device information and add empty if not present (GL-16) ([c8bd497](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/c8bd49700fcdf9bedb07c2ae8cd9c767a3b4081e))
* remove over-flow hidden since it blocks scrolling everywehere ([caaf3ca](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/caaf3cabca86ae2c55e7014bf9cbd8af243c0229))


### Code Refactoring

* create barrel export for devices for consitancy (GL-9) ([de8ff06](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/de8ff067d4b2dd37f6c2a6bfbd81389380d60978))
* implement builders for shared sections (GL-8) ([25f500f](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/25f500f4645d647b70a11266a861e776b8f6b1b8))
* implement form component for each data type product (GL-13) ([75c47ee](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/75c47ee654784655ee49b3fc6ef0634d6cd1777a))
* implement mappers for shared sections (GL-7) ([6b10a9d](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/6b10a9d9b3f2f806e848fe17bb1e46325fa09fc9))
* implement one builder file per top level section (GL-8) ([164fd95](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/164fd95e01324a6b61e48279e5076cd35f88204c))
* implement one mapper file per top level section (GL-7) ([3bc5d16](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/3bc5d16d1106f734d13d8b15dce00636a7ff685f))
* implement one schema file per top level section (GL-18) ([20f0edb](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/20f0edb225e8eb16b33f039ca5f541869356af75))
* implement reusable alternative names slice and schema (GL-16) ([d17c24c](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/d17c24c1cc177574422b93869e48a39e2093566f))
* implement reusable legible descriptions form components (GL-13) ([b5cca22](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/b5cca2241d630b595754466489b4ad87d3718b91))
* implement reusable legible descriptions slice and schema (GL-16) ([f86cd7b](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/f86cd7b3fbb711bd15d95c67bdf3ebdb373cf138))
* implement shared release notes form (GL-12) ([a65bb23](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/a65bb230668a2789ba1e3e7b7c5a1154a91c80d4))
* implement shared release notes slice and schema (GL-16) ([0b936fa](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/0b936fa6ff8a33f67e8b9f3fb049204334dd9cae))
* make alternative names in functional profiles use generic slice and schema (GL-16) ([2dcdd39](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/2dcdd395c51686b385e63e50b16c061233f10041))
* make data points alternative names use generic slice and schema (GL-16) ([695656f](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/695656f60c2508b6d451c9f5015dd9d482ab9a69))
* make functional profile alternative names forms use generic alternative names form (GL-13) ([b8a80b4](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/b8a80b478b898dee686de075b600ebb1d9a6c690))
* make use-form-section generic for reuse across stores (GL-11) ([896e30c](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/896e30cbce1dfbb588ce4be63dbfcfcdc0a5af92))
* re-import legibledescription mapper (GL-7) ([02a2e5f](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/02a2e5f75f49bac772c6e55171d317ed97d2b0ba))
* remove json dir in parameter-list since its just a string (GL-16) ([e1e0d6f](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/e1e0d6fa087870c8cab4606bec7aa7a08de020b3))
* remove unused functions ([4b7f768](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/4b7f768e77cab309aab66cca2ff13c2970e100c2))
* split up data point list into multiple folders ([3ff826e](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/3ff826e966e4d23771f18af9687e5cff6a8a7ecb))
* use generic legible description slice in functional profiles (GL-16) ([9579959](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/9579959e10aff6bdd25a0f7a130e9d08dff7afdb))
* use generic legible descriptions form in data points legible descriptions (GL-13) ([7f8ab5f](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/7f8ab5f827e8e050af131d148e87f34b745610a7))
* use generic legible descriptions form in functional profile (GL-13) ([d22d7ce](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/d22d7cefdf8a191d4cdf7fdf6207678c99387deb))
* use generic legible descriptions slice for data points legible descriptions (GL-16) ([7321fd8](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/7321fd8e85e12ebc29ae0140afba237dfc820df6))
* use shared release notes forms in devices (GL-12) ([e2f9105](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/e2f9105cac09154baacac7ed6f17738134a0a2d3))
* use shared release notes forms in functional profiles (GL-13) ([07f6e56](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/07f6e569c95af5c2306752f94287ad5a6f6381e2))
* use shared release notes slice in functional profiles (GL-16) ([a960954](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/a960954ed6705e689710af2a97a5d6cf1cc7277a))


### Chores

* change description of card (GL-6) ([fe06971](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/fe06971f4d62a21c0702c12160572ce819de539a))
* format description slice (GL-16) ([e6d7c10](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/e6d7c10ebd31d550d1e5e4b8852822933e3d9491))
* stop scrolling of the landing page (GL-6) ([da9c6ae](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/da9c6ae94bdaaafb7a2325701aef17c91c49f4de))
* update react and nextjs versions resolving cve's ([bf42295](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/bf42295ab8ca77f637a9ed8d49ef08159d11eaf7))

## [0.12.0](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/compare/v0.11.0...v0.12.0) (2025-11-30)


### Features

* add AlternativeNames and ParameterList state management (GL-16) ([a61e443](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/a61e4435b80475ab29f73a4c2e9f4c61d7dd9fc6))
* add correct types to model (GL-9) ([028808e](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/028808e878acdf0c72d1e5b472f645597ea362d5))
* add DataTypeProduct utilities for ParameterList (GL-16) ([73a23ba](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/73a23ba276b5687d9458240972f9b6f65383788d))
* add reusable AlternativeNames update helper (GL-16) ([be2e244](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/be2e244a4e6eeeee1b649835ec60c57a2ea40abc))
* create seperate form components for data types (GL-13) ([7bd34c6](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/7bd34c6c3cc351c609df4426a269ba16a5162945))
* create seperate slices for data types (GL-16) ([48f3abb](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/48f3abb3f17f1623324babdefba76faacc423af1))
* implement form subsection and json array field component (GL-11) ([5534f53](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/5534f532956382cc11298af4ef30810e8b902704))
* implement mappers for datatypes (GL-7) ([1bd8e4c](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/1bd8e4cb63138732e1f1a566be4ad8f1dd2ecd5a))
* implement new form section hook (GL-11) ([7ca8ae5](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/7ca8ae55bedeef641d62dbe907b7d30b9c7a3080))
* integrate AlternativeNames and ParameterList forms (GL-13) ([bb874fa](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/bb874faae5dca93331f525f40a39c2d47f81df71))
* use datatype mappers and reuse legible descriptions mapper in data points mapper (GL-7) ([4acd178](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/4acd1786f34669c3564cbf1342f187d1f7bd494c))


### Bug Fixes

* build empty json datatype correctly and move parameter list to correct place (GL-8) ([ad003b7](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/ad003b72dc62fe17851e18300cbe34da588c52dd))
* factory model data type definition ([d929cce](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/d929ccee90b6022b4734f5c5a6b90d43c4093eba))
* map empty json datatype correctly (GL-7) ([abbc6da](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/abbc6dafb397aaaf94b24f4f024f27345e29b27d))


### Code Refactoring

* add nested prop to form section (GL-11) ([d37e155](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/d37e155ac4fe5163c57df9c5dc811a68fd4c3dbb))
* always call hooks unconditionally (GL-11) ([8eebc63](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/8eebc63cc1be27a3e90b736100c17ed7f251f09b))
* implement builder utils (GL-8) ([3a220be](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/3a220be9d18f0bc0a962b90d41a81dcb7a2ef903))
* implement builder utils in builders (GL-8) ([5d6f1cf](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/5d6f1cfbeb5aac67fe15ee29c3c2b13be8d211b0))
* implement form section hook in form components (GL-13) ([283d331](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/283d3311a060e40aaedad600fcd27b12adb24b41))
* implement mapper utils (GL-7) ([7df3bd3](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/7df3bd3809be5ec29682d3da0abdeaaf15760dba))
* implement mapper utils in mappers (GL-7) ([61f1bfe](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/61f1bfeabb011824faa1d2eda47be3af81595787))
* implement slice utils and use them in slices (GL-16) ([0b68a1f](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/0b68a1f4ac4f26664f23d42cfeb71359a110b1e4))
* make all imports absolute ([fb33adc](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/fb33adc7f421e462895bdacc86817e76907c3f1a))
* merge schemas with validators, remove unnecessary checks and comment partially implemented model sections ([5ec65e8](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/5ec65e8d633dd51643c0668ffc9f15ca70701361))
* relax type constraint in setoptionalfield utils function (GL-7) ([fadbf01](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/fadbf01767d2072402209e6184c6b59d60ebc49e))


### Chores

* increase prettier max line length and format all files ([a47c60c](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/a47c60c909012ebe71e8a45ff07671199accf39e))

## [0.11.0](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/compare/v0.10.0...v0.11.0) (2025-11-26)


### Features

* add base types for data point list (GL-9) ([493d0ed](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/493d0edef96d8f2ff4d74adef2a176a2bace5760))
* create frontend-form for data point list and integrate into main-form of functional profiles (GL-13) ([405cc6e](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/405cc6eae8927de67caaef5de46bd1b29f4c876c))
* implement builder for data point list and integrate into main main-builder of functional profile (GL-8) ([24df273](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/24df273b3e69c1bddf2e57ec2895a5406bd14e56))
* implement mapper for data point list and integrate into main-mapper of functional profile (GL-7) ([7a61a02](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/7a61a02c7cc57e3ba6c10eda13917618f4dfaf6e))
* implement model and factory for data point list (GL-9) ([60eeb3a](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/60eeb3ac1ea32ccb03a09ca0297d9f6fbef89e1a))
* implement schema for data point list and integrate into main schema for functional profile (GL-18) ([377bf57](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/377bf57c0a1ff4698f9916083d346bcde23405db))
* implement schema into validator for data point list (GL-18) ([1437a2c](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/1437a2c757a1fe42452e315e6971c6a5f39ff454))
* implement select options for data point list (GL-18) ([29dc11b](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/29dc11b3d436d6ddb0dbbf1d432bd7fa5dd288b5))
* implement slice for data point list und update Store (GL-16) ([be34a74](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/be34a74d4ab7757f08ae08dcb14f37130ef3e7c6))


### Chores

* deactivate debug ([52e5d91](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/52e5d91dd496a8c473efb21667bf9a326d78316d))

## [0.10.0](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/compare/v0.9.0...v0.10.0) (2025-11-26)


### Features

* add a builder for generic attribute list (GL-8) ([0ba82ed](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/0ba82ed357fa409a4c9f95a2d3f929e7dbf95031))
* add genericAtrributeList to FunctionalProfileFrame (GL-9) ([63d8135](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/63d8135fc9c4dadf6e922e34cb4f5439b9c5c526))
* create slice of generic attribute list and update store (GL-16) ([9ef259b](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/9ef259b0b054063921c9a4b3adcf6f7fadcaf2ad))
* implement generic attribut list schema and validator ([8f7a133](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/8f7a1333baff8b66f7182f27bae1d3e19cf1f5c9))
* implement mapper for generic attribute list (GL-7) ([639a6c3](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/639a6c3ea762e15714c4f0e85c3f77d1ba621f4a))
* implement ui-form for genericAttributeList (GL-13) ([942bde2](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/942bde28d5a37f58054b86838d10d38548f8cbc6))
* update basetype and upgrade factory with sample generic AttributeList (GL-9) ([5463cc1](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/5463cc105ecc3a9bce7324f6d519e939af8f34a1))


### Chores

* add local file to gitignore ([2249fde](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/2249fde687c27cb9d646f14029a8408dc2424033))

## [0.9.0](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/compare/v0.8.0...v0.9.0) (2025-11-26)


### Features

* create slice for legible description and integrate into main store (GL-16) ([d4bc695](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/d4bc69523f1465574b30fc713f9cbbbe74c78e74))
* implement legible description builder and enable cdata (GL-8) ([a23e258](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/a23e258a5b3ae836b7f2125656f84c56d637d634))
* implement legible description form (GL-13) ([653f379](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/653f379333ceb271e145240a3847926b87b4fb87))
* implement legible description validation layer including messages and form options (GL-18) ([965de1c](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/965de1cd5b51d04fdefdcbbf8e130c6408231683))
* implement release notes mapper (GL7) ([acdb542](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/acdb5426463e2e6080d57ce251a680ea0f150ef7))
* install textarea and implement text area field component (GL-11) ([677aa66](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/677aa66f0b1302d5f3431006b5261598d4b2d1aa))
* uncomment legible description and add it to sample in factory (GL-9) ([3ef078d](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/3ef078d817d68af5db0f2056965ee8cad66cc9e1))


### Bug Fixes

* cdata handling to passing directly to xml2js (GL-8) ([efadbeb](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/efadbebf25de3078c24d80932b7977f3a6938b50))
* include legible description schema in functional profile schema (GL-18) ([edd384c](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/edd384c02fe09718b0682d7144dcc96da6e8d30e))
* typo in functional-profile folder name ([5b201ab](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/5b201ab36cc38517a4e749b8b91c504a7ca6db9e))


### Tests

* add test page for functional profiles to verify the diff (GL-5) ([b785a4b](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/b785a4b958e6c3acb3b525b75855a6d874852690))


### Code Refactoring

* add max items prop to array field (GL-11) ([7aa1b66](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/7aa1b66083e86ed741f4463afcc9ed3c51c0c7ae))
* delete unused error messages, they are provided by zod (GL-18) ([c6f1670](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/c6f16702a9bdebf065d32c7750d511e42ea6dfb5))
* move messages to shared folder (GL-17) ([77f2f45](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/77f2f458b42251ab736a27f84490af100648c074))

## [0.8.0](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/compare/v0.7.0...v0.8.0) (2025-11-25)


### Features

* add alternative names to the model (GL-9) ([f93a66d](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/f93a66d89d38201cfc82a2b5c4b8c55dbfb9f44c))
* extend factory methods with alternative names (GL-14) ([21c8774](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/21c8774b94d01646829d895196b5174ef06c7f91))
* implement alternative names buider (GL-8) ([a5cd3f6](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/a5cd3f6faf15f2159eb108f162a32f517314c7de))
* implement alternative names form (GL-13) ([90e6e2f](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/90e6e2f7ba513f5ec0683b37ab6cf393432eace9))
* implement alternative names mapper and add alternative names section to sample xml (GL-7) ([1105e68](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/1105e68198c007ed581b24b44a38e3186bd03450))
* implement alternative names validator (GL-18) ([98ca9e8](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/98ca9e80953bd63e6ee32a632f4d4ec806cb75d9))
* implement schema for alternative names (GL-18) ([9b43d47](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/9b43d474f878f0e07069f386693ec8369bf6ca2f))
* implement store slice for alternative names (GL-16) ([2b57274](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/2b57274a8210364dd75d9edaa9a4c981e1bc43fb))

## [0.7.0](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/compare/v0.6.2...v0.7.0) (2025-11-24)


### Features

* implement confirmation dialogs (GL-14) ([b4c3a49](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/b4c3a49e88aa5cde65177fdd0f0f0dde696cbd1d))
* use shadcn date picker approach (GL-11) ([53166a8](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/53166a8f512f575cd23ad984ba542ff6963545bf))


### Chores

* import sample xml files ([3f89c7c](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/3f89c7c32eee90a709695f0f63afa79c20bf6aa2))
* install shadcn calendar and popover (GL-11) ([914d9aa](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/914d9aae8132e47d01dd15677ff77188a7767f50))


### Code Refactoring

* change entire folder structure, group all files by sections ([25acedb](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/25acedbb49a04c2a1a20a567d0bb120af678ac8e))

### [0.6.2](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/compare/v0.6.1...v0.6.2) (2025-11-23)


### Bug Fixes

* correct the xml structure (GL-5) ([2b60367](https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool/commit/2b60367bfc0b3c91f060b45bff29902a1741132a))

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
