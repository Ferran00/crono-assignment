import type { Signal } from './SignalsList';

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

/**
 * Provides the style corresponding to the tag. signal type tags all have the same style except they vary in colors,
 * and "In sequence" tags have toheir own different style
 * @param tag text of the tag to be rendered. its possible values are: "Role change", "Permission change", "Account created", and "In sequence"
 * @returns tailwind class name for the tag
 */
export function getTagStyle (tag: string):string {
    switch (tag) {
      case 'Role change':
        return 'text-purple-600 bg-purple-50';
      case 'Company change':
        return 'text-amber-600 bg-amber-50';
      case 'Website view':
        return 'text-blue-600 bg-blue-50';
      case 'In sequence':
        return 'text-pink-500 bg-pink-50';
      default:
        return 'text-slate-600 bg-slate-100';
    }
  };
