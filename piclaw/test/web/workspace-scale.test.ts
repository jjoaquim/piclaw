/**
 * test/web/workspace-scale.test.ts – Tests for workspace explorer scale resolution.
 */

import { describe, expect, test } from 'bun:test';

import {
    clampWorkspaceScale,
    getResponsiveWorkspaceScale,
    getWorkspaceScaleMetrics,
    normalizeWorkspaceScale,
    resolveWorkspaceScale,
} from '../../web/src/ui/workspace-scale.js';

describe('workspace scale helpers', () => {
    test('normalizes valid presets and rejects unknown values', () => {
        expect(normalizeWorkspaceScale('compact')).toBe('compact');
        expect(normalizeWorkspaceScale('COMFORTABLE')).toBe('comfortable');
        expect(normalizeWorkspaceScale('weird')).toBe('default');
    });

    test('responsive scale prefers comfortable for touch and narrow viewports', () => {
        expect(getResponsiveWorkspaceScale({ isTouch: true, width: 1400 })).toBe('comfortable');
        expect(getResponsiveWorkspaceScale({ isTouch: false, width: 1100 })).toBe('comfortable');
        expect(getResponsiveWorkspaceScale({ isTouch: false, width: 1440 })).toBe('default');
    });

    test('compact override is clamped on touch devices', () => {
        expect(clampWorkspaceScale('compact', { isTouch: true })).toBe('default');
        expect(resolveWorkspaceScale({ stored: 'compact', isTouch: true, width: 1400 })).toBe('default');
    });

    test('desktop override can still request compact', () => {
        expect(resolveWorkspaceScale({ stored: 'compact', isTouch: false, width: 1440 })).toBe('compact');
    });

    test('metrics expose the scaled indentation step', () => {
        expect(getWorkspaceScaleMetrics('compact').indentPx).toBe(14);
        expect(getWorkspaceScaleMetrics('default').indentPx).toBe(16);
        expect(getWorkspaceScaleMetrics('comfortable').indentPx).toBe(18);
    });
});
