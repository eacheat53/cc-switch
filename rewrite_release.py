import re
with open(".github/workflows/release.yml", "r") as f:
    content = f.read()

# Remove macOS from matrix
content = re.sub(r'\s+- os: macos-14\n', '\n', content)

# Remove the Prepare Tauri signing key block
content = re.sub(r'      - name: Prepare Tauri signing key.*?✅ Tauri signing key prepared"\n', '', content, flags=re.DOTALL)

# Remove Import Apple signing certificate
content = re.sub(r'      - name: Import Apple signing certificate.*?rm -f "\$CERT_PATH"\n', '', content, flags=re.DOTALL)

# Remove macOS Build
content = re.sub(r'      - name: Build Tauri App \(macOS\).*?sleep "\$sleep_seconds"\n            done\n', '', content, flags=re.DOTALL)

# Remove Prepare macOS Assets
content = re.sub(r'      - name: Prepare macOS Assets.*?✅ Styled DMG created: \$NEW_DMG"\n', '', content, flags=re.DOTALL)

# Remove Notarize macOS DMG
content = re.sub(r'      - name: Notarize macOS DMG.*?sleep "\$sleep_seconds"\n            done\n', '', content, flags=re.DOTALL)

# Remove Verify macOS code signing
content = re.sub(r'      - name: Verify macOS code signing and notarization.*?exit 1\n            fi\n', '', content, flags=re.DOTALL)

# Remove Clean up Apple signing keychain
content = re.sub(r'      - name: Clean up Apple signing keychain.*?security delete-keychain "\$RUNNER_TEMP/build.keychain-db" \|\| true\n          fi\n', '', content, flags=re.DOTALL)

# Remove macOS sections in the latest.json assembler and release description
content = re.sub(r'            - \*\*macOS\*\*.*?\n', '', content)
content = re.sub(r'            macOS 版本已通过 Apple 代码签名和公证，可直接安装使用。\n', '', content)

with open(".github/workflows/release.yml", "w") as f:
    f.write(content)
