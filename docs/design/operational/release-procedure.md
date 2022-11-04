# Release Procedure

- git flow release start [version]
- npm version [patch | minor | major]
- git flow release publish
- git hub PR to main with rebase
- merge PR
- git flow release finish -n --nodevelopmerge

[should switch to main branch]
- git pull -f
  - take remote history because release doesn't allow rebasing, which is better tbh
