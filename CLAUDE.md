# `blank` is read-only

This branch holds nothing but this file, on top of the repo's empty root commit. Every session that starts here works on its own new branch, created from that root so it starts with no files, not even this one.

The one exception: when the user asks you to edit this file, edit it here on `blank` and skip the rest.

## First action

Before any other work, and without asking, create and push the work branch:

```sh
git switch -c <name> 38f07be93ee9cbbc9c690d68aa6a911e95a9fab2  # the empty root commit
git push -u origin <name>
```

Name it after the user's request, like `wem-esoo-2026-charts`. Done when `git status` shows `<name>` tracking `origin/<name>` and `CLAUDE.md` is gone from the working tree.

## For the rest of the session

All commits and pushes go to the work branch. `blank` stays untouched: never commit, push or merge to it, or open a pull request into it.
