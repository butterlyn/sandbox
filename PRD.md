# PRD: Windows 11 PC setup

Requirements for my Windows 11 PC, used mainly for software development and gaming, and to a lesser extent for office work. The winget-config-maintainer agent turns them into the WinGet configuration `.config/configuration.winget`.

## A living file, not a one-time setup

This PRD isn't single-use. I'll keep updating it as I add apps or change the PC, and after each change the agent updates the config and I rerun it on the same, already set-up PC.

Deleting a requirement doesn't undo it on the PC; to remove an app, list it under [Apps to remove](#apps-to-remove).

## How to read this

- Every requirement starts with an ID: **RUN** for how reruns behave, **SYS** for Windows itself, **APP** for apps, **SET** for look and feel.
- Only lines that start with an ID are requirements; everything else explains how the file is used or adds a note.
- IDs are permanent. A new requirement takes the next free number in its group, and a deleted requirement's ID is never reused, so the config's references stay valid.

## Reruns

- **RUN-01** Every run also upgrades each app under [Apps to install](#apps-to-install) to its latest version, except Ubuntu (APP-10), Docker Desktop (APP-11) and Steam (APP-12)
  - Note: if an upgrade fails, WinGet uninstalls and reinstalls the app, which for those three would delete the Ubuntu files, Docker's containers and images, and Steam's installed games. Steam and Docker Desktop update themselves, and Ubuntu's software updates through apt inside Linux.

## System

- **SYS-01** Windows 11 only: stop if the PC runs anything older
- **SYS-02** Developer Mode on
- **SYS-03** Long file paths (over 260 characters) allowed
- **SYS-04** Never sleep when plugged in; the screen still turns off when idle, on the Windows default timer

## Apps to install

### Browser

- **APP-01** Google Chrome

### Development

- **APP-02** Visual Studio Code
- **APP-03** Git
- **APP-04** uv, the Python package and project manager; Python projects run through it
- **APP-05** Python 3.14, installed alongside uv
- **APP-06** Node.js, LTS release
- **APP-07** Bun
- **APP-08** Databricks CLI
- **APP-09** Windows Subsystem for Linux (WSL)
- **APP-10** Ubuntu for WSL, the newest LTS release available
- **APP-11** Docker Desktop

### Gaming

- **APP-12** Steam
- **APP-13** Battle.net
- **APP-14** GOG GALAXY

### Chat and calls

- **APP-15** Discord
- **APP-16** WhatsApp
- **APP-17** Microsoft Teams, for a personal Microsoft account

### Office and notes

- **APP-18** Microsoft 365 desktop apps, the standard suite (Word, Excel, PowerPoint, Outlook, OneNote and the rest), in the edition a Personal or Family plan activates
  - Note: WinGet's `Microsoft.Office` package installs Microsoft 365 Apps for enterprise, the edition for work and school accounts.
- **APP-19** Obsidian, the note-taking desktop app

### Utilities

- **APP-20** 7-Zip
- **APP-21** PowerToys
- **APP-22** VLC media player
- **APP-23** Notepad++
- **APP-24** WinDirStat

## Apps to remove

These come with Windows.

- **APP-25** Microsoft News
- **APP-26** MSN Weather
- **APP-27** Widgets board (the Windows Web Experience Pack app)
- **APP-28** Microsoft Bing
- **APP-29** Phone Link
- **APP-30** Feedback Hub
- **APP-31** Microsoft Family Safety

## Look and feel

- **SET-01** Dark mode for Windows and apps
- **SET-02** Taskbar icons centered
- **SET-03** No Widgets button on the taskbar
- **SET-04** No Task View button on the taskbar
- **SET-05** Seconds in the taskbar clock
- **SET-06** File Explorer shows file extensions
- **SET-07** File Explorer shows hidden files and folders
- **SET-08** File Explorer shows item checkboxes
