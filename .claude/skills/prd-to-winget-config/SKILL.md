---
name: prd-to-winget-config
description: WinGet configuration procedure (PRD.md to .config/configuration.winget), preloaded into the winget-config-maintainer agent. For any WinGet configuration work, delegate to that agent.
user-invocable: false
---

# PRD to WinGet configuration

`PRD.md` is the source of truth for the user's new Windows 11 PC. Keep `.config/configuration.winget` a traceable translation of it: every requirement is either in the config or in your report, and every unit in the config traces back to a requirement.

`PRD.md` belongs to the user, so you only read it. The config is yours alone, so what's in it now is your last output.

## Steps

1. **Read** `PRD.md` and the config. Done when you have every requirement ID in the PRD and every unit in the config.
   - A requirement ID is uppercase letters, a hyphen and digits, like `APP-01`. The user picks the prefixes.
   - A requirement written without an ID can't be traced, so it stays out of the config and goes in the report under **Needs an ID**.
   - If the PRD has no requirement IDs yet, leave the config as it is and go straight to the report.
2. **Map** each requirement to the unit or units that meet it, using [Resources](#resources). Done when every ID is mapped or has a reason it isn't: unclear, no suitable resource, or outside what a WinGet configuration can do. You can't ask the user anything mid-run, so an unclear requirement stays out of the config and gets one specific question in the report.
3. **Edit** the config to match the mapping. Done when it holds exactly the mapped units, in the order their requirements appear in the PRD. Leave units that are already right byte-for-byte, so the diff shows only real changes.
4. **Check** with the [check script](#checks). Done when it passes, with anything it couldn't verify listed in the report.
5. **Report** as described in [Report](#report).

## File format

Write schema 0.2, the version Microsoft documents. Keep the three header comments and this shape:

```yaml
# yaml-language-server: $schema=https://aka.ms/configuration-dsc-schema/0.2
# Maintained by the winget-config-maintainer agent from PRD.md. Change PRD.md, not this file.
# Apply on the PC: winget configure -f .config/configuration.winget
properties:
  assertions:          # preconditions, such as a minimum OS version; only when the PRD asks
    - resource: Microsoft.Windows.Developer/OsVersion
      directives:
        description: "[SYS-01] Require Windows 11"
        allowPrerelease: true
      settings:
        MinVersion: "10.0.22000"
  resources:
    - resource: Microsoft.WinGet.DSC/WinGetPackage
      id: git            # only when another unit lists it in dependsOn
      directives:
        description: "[APP-01] Install Git"
        securityContext: elevated
      settings:
        id: Git.Git
        source: winget
  configurationVersion: 0.2.0
```

Every unit has `directives` and `settings`, and:

- `description` starts with the IDs it serves in square brackets, then a few plain words: `[APP-01] Install Git`, `[APP-02, SET-04] Install VS Code`.
- `securityContext: elevated` when it installs software or changes system-wide settings. WinGet asks for one UAC approval up front, and missing admin rights are the most common reason a configuration fails.
- `allowPrerelease: true` when its module has only prerelease versions on the PowerShell Gallery: today `Microsoft.Windows.Developer` and `Microsoft.Windows.Settings`. `Microsoft.WinGet.DSC` has stable releases.
- `dependsOn` lists the `id`s of units that must succeed first, such as an editor extension that needs the editor.

## Resources

- **Apps:** `Microsoft.WinGet.DSC/WinGetPackage`. Set `id` to the package ID exactly as the check prints it, and `source` to `winget`, or `msstore` for a Microsoft Store app. Leave out `version` unless the PRD pins one; other properties keep their defaults unless a requirement needs them. [Definition](https://raw.githubusercontent.com/microsoft/winget-cli/master/src/PowerShell/Microsoft.WinGet.DSC/Microsoft.WinGet.DSC.psm1).
- **Windows settings:** Microsoft's winget-dsc modules. Read the resource's class before using it, and copy property names and enum values exactly. Leave `SID` unset: it's a key the resource fills in itself.
  - `Microsoft.Windows.Developer`: DeveloperMode, OsVersion, Taskbar, WindowsExplorer, UserAccessControl, EnableDarkMode, ShowSecondsInClock, EnableRemoteDesktop, EnableLongPathSupport, PowerPlanSetting, WindowsCapability, NetConnectionProfile, AdvancedNetworkSharingSetting, FirewallRule. [Definition](https://raw.githubusercontent.com/microsoft/winget-dsc/main/resources/Microsoft.Windows.Developer/Microsoft.Windows.Developer.psm1).
  - `Microsoft.Windows.Settings`: WindowsSettings. [Definition](https://raw.githubusercontent.com/microsoft/winget-dsc/main/resources/Microsoft.Windows.Settings/Microsoft.Windows.Settings.psm1).
- **Anything else** stays out of the config until a resource with a readable definition covers it; give the reason in the report.

## Checks

From the repo root, run `python3 -I .claude/skills/prd-to-winget-config/check.py`. It reads the requirement IDs from `PRD.md` and the package IDs from the config, then checks the config against the schema, that each description cites PRD IDs and each `dependsOn` names a unit, and that each package ID exists, spelled as WinGet or the Store spells it. Passes when it prints `checks: OK` and every ID it lists as not in the config is in your report.

To find package IDs by app name, run it with `--find` and the names: `check.py --find "GOG Galaxy" ubuntu`.

It needs network access and Python 3 with `pyyaml` and `jsonschema`. When it can't run, list what went unchecked in the report.

## Report

End with this report. The caller passes it to the user, so use requirement IDs and plain words:

- **Changes:** units added, changed and removed, each with its IDs, or "No changes."
- **Not in the config:** each ID left out, with its reason.
- **Needs an ID:** requirements written without one.
- **Questions:** one specific question per unclear requirement.
- **Unchecked:** anything a check couldn't verify.
