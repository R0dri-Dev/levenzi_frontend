export function formatDecimal(value: string | number | null | undefined, maxDecimals = 10): string {
    if (value === null || value === undefined || value === '') return '—';

    const num = Number(value);
    if (!Number.isFinite(num)) return String(value);

    if (Number.isInteger(num)) return num.toString();

    return num.toFixed(maxDecimals).replace(/\.?0+$/, '');
}