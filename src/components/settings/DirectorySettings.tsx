import { useMemo } from "react";
import { FolderSearch, Undo2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import type { AppId } from "@/lib/api";
import type { ResolvedDirectories } from "@/hooks/useSettings";

interface DirectorySettingsProps {
  appConfigDir?: string;
  resolvedDirs: ResolvedDirectories;
  onAppConfigChange: (value?: string) => void;
  onBrowseAppConfig: () => Promise<void>;
  onResetAppConfig: () => Promise<void>;
  claudeDir?: string;
  claudeWslDir?: string;
  codexDir?: string;
  codexWslDir?: string;
  geminiDir?: string;
  geminiWslDir?: string;
  opencodeDir?: string;
  opencodeWslDir?: string;
  openclawDir?: string;
  openclawWslDir?: string;
  onDirectoryChange: (app: AppId | "claudeWsl" | "codexWsl" | "geminiWsl" | "opencodeWsl" | "openclawWsl", value?: string) => void;
  onBrowseDirectory: (app: AppId | "claudeWsl" | "codexWsl" | "geminiWsl" | "opencodeWsl" | "openclawWsl") => Promise<void>;
  onResetDirectory: (app: AppId | "claudeWsl" | "codexWsl" | "geminiWsl" | "opencodeWsl" | "openclawWsl") => Promise<void>;
}

export function DirectorySettings({
  appConfigDir,
  resolvedDirs,
  onAppConfigChange,
  onBrowseAppConfig,
  onResetAppConfig,
  claudeDir,
  claudeWslDir,
  codexDir,
  codexWslDir,
  geminiDir,
  geminiWslDir,
  opencodeDir,
  opencodeWslDir,
  openclawDir,
  openclawWslDir,
  onDirectoryChange,
  onBrowseDirectory,
  onResetDirectory,
}: DirectorySettingsProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* CC Switch 配置目录 - 独立区块 */}
      <section className="space-y-4">
        <header className="space-y-1">
          <h3 className="text-sm font-medium">{t("settings.appConfigDir")}</h3>
          <p className="text-xs text-muted-foreground">
            {t("settings.appConfigDirDescription")}
          </p>
        </header>

        <div className="flex items-center gap-2">
          <Input
            value={appConfigDir ?? resolvedDirs.appConfig ?? ""}
            placeholder={t("settings.browsePlaceholderApp")}
            className="text-xs"
            onChange={(event) => onAppConfigChange(event.target.value)}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onBrowseAppConfig}
            title={t("settings.browseDirectory")}
          >
            <FolderSearch className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onResetAppConfig}
            title={t("settings.resetDefault")}
          >
            <Undo2 className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Claude/Codex 配置目录 - 独立区块 */}
      <section className="space-y-4">
        <header className="space-y-1">
          <h3 className="text-sm font-medium">
            {t("settings.configDirectoryOverride")}
          </h3>
          <p className="text-xs text-muted-foreground">
            {t("settings.configDirectoryDescription")}
          </p>
        </header>

        <DirectoryInput
          label={t("settings.claudeConfigDir")}
          description={undefined}
          value={claudeDir}
          resolvedValue={resolvedDirs.claude}
          placeholder={t("settings.browsePlaceholderClaude")}
          onChange={(val) => onDirectoryChange("claude", val)}
          onBrowse={() => onBrowseDirectory("claude")}
          onReset={() => onResetDirectory("claude")}
        />

        <DirectoryInput
          label={t("settings.claudeWslConfigDir", { defaultValue: "Claude Code WSL 配置目录" })}
          description={t("settings.claudeWslDescription", { defaultValue: "Specify the WSL path (e.g. \\\\wsl$\\Ubuntu\\home\\user\\.claude)" })}
          value={claudeWslDir}
          resolvedValue={resolvedDirs.claudeWsl}
          placeholder="\\wsl$\Ubuntu\home\user\.claude"
          onChange={(val) => onDirectoryChange("claudeWsl", val)}
          onBrowse={() => onBrowseDirectory("claudeWsl")}
          onReset={() => onResetDirectory("claudeWsl")}
        />

        <DirectoryInput
          label={t("settings.codexConfigDir")}
          description={undefined}
          value={codexDir}
          resolvedValue={resolvedDirs.codex}
          placeholder={t("settings.browsePlaceholderCodex")}
          onChange={(val) => onDirectoryChange("codex", val)}
          onBrowse={() => onBrowseDirectory("codex")}
          onReset={() => onResetDirectory("codex")}
        />

        <DirectoryInput
          label={t("settings.codexWslConfigDir", { defaultValue: "Codex WSL 配置目录" })}
          description={t("settings.codexWslDescription", { defaultValue: "Specify the WSL path (e.g. \\\\wsl$\\Ubuntu\\home\\user\\.codex)" })}
          value={codexWslDir}
          resolvedValue={resolvedDirs.codexWsl}
          placeholder="\\wsl$\Ubuntu\home\user\.codex"
          onChange={(val) => onDirectoryChange("codexWsl", val)}
          onBrowse={() => onBrowseDirectory("codexWsl")}
          onReset={() => onResetDirectory("codexWsl")}
        />

        <DirectoryInput
          label={t("settings.geminiConfigDir")}
          description={undefined}
          value={geminiDir}
          resolvedValue={resolvedDirs.gemini}
          placeholder={t("settings.browsePlaceholderGemini")}
          onChange={(val) => onDirectoryChange("gemini", val)}
          onBrowse={() => onBrowseDirectory("gemini")}
          onReset={() => onResetDirectory("gemini")}
        />

        <DirectoryInput
          label={t("settings.geminiWslConfigDir", { defaultValue: "Gemini WSL 配置目录" })}
          description={t("settings.geminiWslDescription", { defaultValue: "Specify the WSL path (e.g. \\\\wsl$\\Ubuntu\\home\\user\\.gemini)" })}
          value={geminiWslDir}
          resolvedValue={resolvedDirs.geminiWsl}
          placeholder="\\wsl$\Ubuntu\home\user\.gemini"
          onChange={(val) => onDirectoryChange("geminiWsl", val)}
          onBrowse={() => onBrowseDirectory("geminiWsl")}
          onReset={() => onResetDirectory("geminiWsl")}
        />

        <DirectoryInput
          label={t("settings.opencodeConfigDir")}
          description={undefined}
          value={opencodeDir}
          resolvedValue={resolvedDirs.opencode}
          placeholder={t("settings.browsePlaceholderOpencode")}
          onChange={(val) => onDirectoryChange("opencode", val)}
          onBrowse={() => onBrowseDirectory("opencode")}
          onReset={() => onResetDirectory("opencode")}
        />

        <DirectoryInput
          label={t("settings.opencodeWslConfigDir", { defaultValue: "OpenCode WSL 配置目录" })}
          description={t("settings.opencodeWslDescription", { defaultValue: "Specify the WSL path (e.g. \\\\wsl$\\Ubuntu\\home\\user\\.config\\opencode)" })}
          value={opencodeWslDir}
          resolvedValue={resolvedDirs.opencodeWsl}
          placeholder="\\wsl$\Ubuntu\home\user\.config\opencode"
          onChange={(val) => onDirectoryChange("opencodeWsl", val)}
          onBrowse={() => onBrowseDirectory("opencodeWsl")}
          onReset={() => onResetDirectory("opencodeWsl")}
        />

        <DirectoryInput
          label={t("settings.openclawConfigDir")}
          description={undefined}
          value={openclawDir}
          resolvedValue={resolvedDirs.openclaw}
          placeholder={t("settings.browsePlaceholderOpenclaw")}
          onChange={(val) => onDirectoryChange("openclaw", val)}
          onBrowse={() => onBrowseDirectory("openclaw")}
          onReset={() => onResetDirectory("openclaw")}
        />

        <DirectoryInput
          label={t("settings.openclawWslConfigDir", { defaultValue: "OpenClaw WSL 配置目录" })}
          description={t("settings.openclawWslDescription", { defaultValue: "Specify the WSL path (e.g. \\\\wsl$\\Ubuntu\\home\\user\\.openclaw)" })}
          value={openclawWslDir}
          resolvedValue={resolvedDirs.openclawWsl}
          placeholder="\\wsl$\Ubuntu\home\user\.openclaw"
          onChange={(val) => onDirectoryChange("openclawWsl", val)}
          onBrowse={() => onBrowseDirectory("openclawWsl")}
          onReset={() => onResetDirectory("openclawWsl")}
        />
      </section>
    </div>
  );
}

interface DirectoryInputProps {
  label: string;
  description?: string;
  value?: string;
  resolvedValue: string;
  placeholder?: string;
  onChange: (value?: string) => void;
  onBrowse: () => Promise<void>;
  onReset: () => Promise<void>;
}

function DirectoryInput({
  label,
  description,
  value,
  resolvedValue,
  placeholder,
  onChange,
  onBrowse,
  onReset,
}: DirectoryInputProps) {
  const { t } = useTranslation();
  const displayValue = useMemo(
    () => value ?? resolvedValue ?? "",
    [value, resolvedValue],
  );

  return (
    <div className="space-y-1.5">
      {label ? (
        <div className="space-y-1">
          <p className="text-xs font-medium text-foreground">{label}</p>
          {description ? (
            <p className="text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
      ) : description ? (
        <p className="text-xs text-muted-foreground">{description}</p>
      ) : null}
      <div className="flex items-center gap-2">
        <Input
          value={displayValue}
          placeholder={placeholder}
          className="text-xs"
          onChange={(event) => onChange(event.target.value)}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onBrowse}
          title={t("settings.browseDirectory")}
        >
          <FolderSearch className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onReset}
          title={t("settings.resetDefault")}
        >
          <Undo2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
