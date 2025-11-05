# SmartGridready Declaration Tool

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://gitlab.fhnw.ch/ip5-smartgridready/sgr-declaration-tool.git
   ```

2. **Install dependencies**

   ```bash
   npm i
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000).

## Commit Rules

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.

### Commit Message Format

Each commit message should follow this format:

```plaintext
<type>(<scope>): <subject> (GL-<Issue Number>)
```

- **Type** (required): The type of change being made
- **Scope** (optional): The area of the codebase affected
- **Subject** (required): A short, imperative description of the change
- **Issue Number** (required): The linked Issue from GitLab

**Example:**

```bash
git commit -m "feat(api): change device endpoint structure (GL-99)"
```

## Husky Pre-commit Checks

This project uses [Husky](https://typicode.github.io/husky/) to run automated checks before commits:

- **Pre-commit hook**: Runs `npm run lint` and `npm run format:check`
- **Commit-msg hook**: Validates commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) specification

## Releasing

Releases are performed **manually** using semantic versioning (patch, minor, major).
The project uses [standard-version](https://github.com/conventional-changelog/standard-version).

### Release Process

1. **Choose the release type**

   - **Patch** (`0.2.0` → `0.2.1`): Bug fixes, patches
   - **Minor** (`0.2.0` → `0.3.0`): New features, backwards compatible
   - **Major** (`0.2.0` → `1.0.0`): Breaking changes

2. **Run the release command**

   For a **patch** release:

   ```bash
   npm run release:patch
   ```

   For a **minor** release:

   ```bash
   npm run release:minor
   ```

   For a **major** release:

   ```bash
   npm run release:major
   ```

   This will:

   - Bump the version in `package.json`
   - Generate/update `CHANGELOG.md` based on commit history
   - Create a git tag with the new version
   - Create a commit with the version bump and changelog

3. **Push the release**

   ```bash
   git push --follow-tags origin main
   ```

### Deployment

The GitLab CI/CD pipeline automatically deploys to GitLab Pages when a tag is pushed. The deployment is triggered by the tag push from the release process.
