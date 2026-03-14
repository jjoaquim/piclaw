#!/usr/bin/env bun
/**
 * Compatibility wrapper for the historical Mermaid vendoring command.
 *
 * The implementation now delegates to the generic manifest-driven vendoring
 * workflow so existing package scripts, Make targets, and docs keep working
 * while the broader reusable workflow ticket is being completed.
 */

import { runBuildCli } from "./vendor-workflow.js";

runBuildCli({ defaultManifest: "vendor-manifests/beautiful-mermaid.json" });
