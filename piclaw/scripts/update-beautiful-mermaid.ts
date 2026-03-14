#!/usr/bin/env bun
/**
 * Compatibility wrapper for the historical Mermaid vendoring updater.
 *
 * The implementation now delegates to the generic manifest-driven vendoring
 * workflow so existing package scripts, Make targets, and docs keep working
 * while the reusable workflow is rolled out.
 */

import { runUpdateCli } from "./vendor-workflow.js";

runUpdateCli({ defaultManifest: "vendor-manifests/beautiful-mermaid.json" });
