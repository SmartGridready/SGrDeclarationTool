# GitLab Commit Guidelines

### 1. **Commit Message Format**

- **Start with the commit type prefix**:

  - Every commit must start with a type prefix like `feat:`, `fix:`, `refactor:`, etc.
  - Example: `fix: Prevent null pointer exception in user controller (GL-123)`.

- **Use imperative tone**:

  - Describe what the commit does, not what it did.
  - Example: `test: Add unit tests for PaymentService (GL-234)` (instead of "Added unit tests").

- **Keep messages short and concise**:
  - Limit the first line to 50 characters. If you need more detail, include it in the description.

### 2. **Structure of a Commit Message**

- **Subject Line**:  
  `<type>: <short description of the change> (GL-xxx)`

- **Optional Description**:

  - If the commit requires more explanation, leave a blank line after the subject line and provide more details.
  - Example:

    ```
    refactor: Update authentication logic (GL-456)

    Refactored the authentication flow to improve security by:
    - Adding token expiration checks
    - Updating JWT generation process
    ```

### 3. **Types of Commits**

- **feat**: A new feature.
  - Example: `feat: Add new payment gateway support (GL-789)`
- **fix**: A bug fix.
  - Example: `fix: Correct typo in config file (GL-101)`
- **refactor**: Code changes that neither fix a bug nor add a feature.

  - Example: `refactor: Clean up controller logic (GL-202)`

- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.).

  - Example: `style: Reformat code to follow style guide (GL-303)`

- **docs**: Documentation-only changes.

  - Example: `docs: Update README with setup instructions (GL-404)`

- **test**: Adding or updating tests.

  - Example: `test: Add integration tests for login functionality (GL-505)`

- **chore**: Routine tasks such as build process changes, dependency updates, etc.
  - Example: `chore: Update dependencies to latest versions (GL-606)`

### 4. **Best Practices**

- **Commit often**: Smaller, focused commits are easier to review, test, and revert if necessary.
- **Single responsibility**: Each commit should address a single issue or concern.
- **Avoid WIP commits**: Do not commit work-in-progress code. Use feature branches and rebase if necessary.
