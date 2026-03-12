import { fileAttachments } from "./file-attachments.js";
import { messagesCrud } from "./messages-crud.js";
import { modelControl } from "./model-control.js";
import { internalTools } from "./internal-tools.js";
import { keychainTools } from "./keychain-tools.js";
import { sqlIntrospect } from "./sql-introspect.js";
import { scheduledTasks } from "./scheduled-tasks.js";
import { workspaceSearch } from "./workspace-search.js";
import { uiThemeExtension } from "./ui-theme.js";
/** Array of all built-in extension factories to register on session creation. */
export const builtinExtensionFactories = [
    fileAttachments,
    messagesCrud,
    modelControl,
    internalTools,
    keychainTools,
    sqlIntrospect,
    scheduledTasks,
    workspaceSearch,
    uiThemeExtension,
];
