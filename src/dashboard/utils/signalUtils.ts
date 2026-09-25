import type { Signal } from '../components/SignalsList';

/**
 * Formats a signal's date down to "Month day, year" (example: "Apr 2, 2025")
 * @param timestampMs The signal's timestamp in miliseconds
 */
export function formatSignalDate(timestampMs: number): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(timestampMs));
}

/**
 * Composes the title according to the type of signal, using the signal's values
 * @param signal: the signal the title belongs to
 * @returns title for the signal, composed using its values
 */
export function getSignalTitle(signal:Signal):string {
switch (signal.signalType) {
    case 'ROLE_CHANGE':
        return `${signal.username} changed role from ${signal.previousRole ?? ''} to ${signal.newRole ?? ''} at ${signal.company ?? ''}`;

    case 'WEBSITE_VIEW':
        return `${signal.company || signal.username} viewed ${signal.nPages_Viewed ?? 0} pages of your website for ${signal.timePagesViewedS ?? 0} sec`;

    case 'COMPANY_CHANGE':
        return `${signal.username} moved to ${signal.company ?? ''} as ${signal.newRole ?? ''}`;

    default:
        return `${signal.username}: signal of unrecognised type`;
}
}