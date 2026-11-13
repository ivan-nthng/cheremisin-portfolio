import {fileURLToPath} from 'node:url';

const workflowImport = name => JSON.stringify(fileURLToPath(new URL(name, import.meta.url)));

// Local importer seams only. Fail visibly if the native source contract moves.
const replace=(code,from,to)=>{if(!code.includes(from))throw new Error(`Admin demo source seam changed: ${from}`);return code.replace(from,to);};
export function adminPresentation(code,id) {
  if(id.endsWith('/admin/admin-overview.tsx')) {
    code=replace(code,'const [section, setSection] = useState(0);',`const query = new URLSearchParams(location.search);
    const presentation = ["guided", "poster"].includes(query.get("mode") ?? "");
    const initialSection = presentation ? 8 : 0;
    const [section, setSection] = useState(initialSection);`);
    code=replace(code,'useReviewNavigationCount({ directory, ready, locked, section, todayDay, locale })','useReviewNavigationCount({ directory, ready: ready && !presentation, locked, section, todayDay, locale })');
    code=code.replace(/const enabled = \(index: number\) => [^;]+;/,'const enabled = (index: number) => index === initialSection || index === 8 || index === 9 || !presentation;');
    code=replace(code,'enabled={ready && directory.signedIn}','enabled={ready && directory.signedIn && !presentation}');
    code=replace(code,'<AdminAnalytics locale={locale}','<AdminAnalytics salesDemo locale={locale}');
    code=replace(code,'productReader={localProductAnalyticsReader(environment)} salesReader={localAdminSalesReader(environment)} reportReader={localAnalyticsReportReader(environment)}','');
    code=replace(code,'.focus(destination ? { preventScroll: true } : undefined)','.focus(destination || new URLSearchParams(location.search).get("mode") === "guided" ? { preventScroll: true } : undefined)');
  }
  if(id.endsWith('/admin/admin-analytics.tsx'))code=replace(code,'{ id: "product", label: m.product, content:','{ id: "product", label: m.product, disabled: salesDemo, content:');
  if(id.endsWith('/admin/admin-sales-demo.tsx')) {
    code=replace(code,'const chartId = useId();','const chartId = useId();\n  const chartOnly = new URLSearchParams(location.search).get("clip") === "analytics";');
    code=replace(code,'useState<WorkspacePeriodValue>({ preset: "month", range: salesDemoRanges.month })','useState<WorkspacePeriodValue>(chartOnly ? workflowSalesInitialPeriod : { preset: "month", range: salesDemoRanges.month })');
    code=replace(code,'const isMoney = mode === "money", snapshot = salesDemoSnapshot(period.range, scope);','const workflow = chartOnly ? workflowSales(period.range, scope) : null;\n  const isMoney = mode === "money", snapshot = chartOnly ? workflow : salesDemoSnapshot(period.range, scope);');
    code=replace(code,'...(isMoney ? [{ field: "grain"','...(isMoney && !chartOnly ? [{ field: "grain"');
    code=replace(code,'const weeks = !snapshot ? [] : grain === "week" ? snapshot.weeks', 'const weeks = chartOnly ? workflow?.buckets ?? [] : !snapshot ? [] : grain === "week" ? snapshot.weeks');
    code=replace(code,'const chartTitle = isMoney ?','const chartTitle = chartOnly ? workflow?.daily ? "Delivered value per day" : m.weekly : isMoney ?');
    code=replace(code,'const axisMax = isMoney ?', 'const axisMax = chartOnly && workflow?.daily ? 300 : isMoney ?');
    code=replace(code,'<Select size="sm" appearance="soft" width="hug" label={m.mode}', '{!chartOnly && <><Select size="sm" appearance="soft" width="hug" label={m.mode}');
    code=replace(code,'onChange={next => { setPeriod(next); resetInspection(); }} />','onChange={next => { setPeriod(next); resetInspection(); }} /></>}');
    code=replace(code,'className={analyticsStyles.chartCard} aria-label={m.demo}', 'className={analyticsStyles.chartCard} aria-label={chartOnly ? m.periodValue : m.demo} data-workflow-chart={chartOnly || undefined}');
    code=replace(code,'overflow={<AnalyticsCardMenu','overflow={chartOnly ? undefined : <AnalyticsCardMenu');
    code=replace(code,'</div><Tag label={m.demo} /></div>', '</div>{!chartOnly && <Tag label={m.demo} />}</div>');
    code=replace(code,'<Select size="sm" appearance="soft" width="hug" label={m.presentation}', '<div className={chartOnly ? "workflow-chart-actions" : undefined}>\n          {chartOnly && <WorkflowPeriod value={period} onChange={next => { setPeriod(next); resetInspection(); }} />}\n          <Select size="sm" appearance="soft" width="hug" label={m.presentation}');
    code=replace(code,'resetInspection(); }} />\n        </div>','resetInspection(); }} />\n          </div>\n        </div>');
    code=replace(code,'className={analyticsStyles.plotBreathing}', 'className={analyticsStyles.plotBreathing} data-workflow-plot={chartOnly || undefined}');
    code=replace(code,'<Text variant="body-sm" className={styles.secondary}>{scopeName} · {dateLabel}</Text>','{!chartOnly && <Text variant="body-sm" className={styles.secondary}>{scopeName} · {dateLabel}</Text>}');
    code=replace(code,'<Text variant="body-sm" className={styles.secondary}>{isMoney ? `${number(snapshot.portions)} ${m.portionsShort} · ${m.food}` : m.ranked}</Text>', '{!chartOnly && <Text variant="body-sm" className={styles.secondary}>{isMoney ? `${number(snapshot.portions)} ${m.portionsShort} · ${m.food}` : m.ranked}</Text>}');
    code=replace(code,'{snapshot ? <div className={styles.section}><CardHeader title={tableTitle} />',`{!chartOnly && (snapshot && isMoney ? <SalesBreakdown title={tableTitle} hideLabel={locale === "pt" ? "Ocultar detalhamento" : "Hide breakdown"} showLabel={locale === "pt" ? "Mostrar detalhamento" : "Show breakdown"} locale={locale} showYear
      items={weeks.map(week => ({id:week.start,startDay:week.start,endDay:week.end,portions: number(week.portions)+" "+m.portionsShort,value:money(week.value)}))}/> : snapshot ? <div className={styles.section}><CardHeader title={tableTitle} />`);
    code=replace(code,'</div> : null}\n    <Text variant="body-sm" className={styles.secondary}>{m.note}</Text>', '</div> : null)}\n    {!chartOnly && <Text variant="body-sm" className={styles.secondary}>{m.note}</Text>}');
    code=`import { SalesBreakdown } from "../workspace/sales-breakdown";
import { WorkflowPeriod } from ${workflowImport('./workflow-period.tsx')};
import { workflowSales, workflowSalesInitialPeriod } from ${workflowImport('./workflow-sales.ts')};
`+code;
  }
  if (id.endsWith('/workspace/restaurant-delivery-settings.tsx')) {
    code=replace(code,'const shared = e.profile.saaviSchedule;', 'const capacityOnly = new URLSearchParams(location.search).get("clip") === "calendar";\n  const shared = e.profile.saaviSchedule;');
    const editorHeading = 'title={surface === "admin" ? e.profile.displayName : m.calendar} breadcrumbs={breadcrumbs}';
    code=replace(code,`${editorHeading}\n      leading={<Button`, `${editorHeading}\n      leading={capacityOnly ? undefined : <Button`);
    code=replace(code,'<Switch label={m.saavi}', '{!capacityOnly && <><Switch label={m.saavi}');
    code=replace(code,'</div> : null}\n      <div className={styles.footer}>', '</div> : null}</>}\n      <div className={styles.footer}>');
  }
  if (id.endsWith('/admin/admin-production-workspace.tsx')) {
    code=replace(code,'const m = adminProductionCopy[locale], read = operationalReadCopy[locale], filterId = useId();','const m = adminProductionCopy[locale], read = operationalReadCopy[locale], filterId = useId();\n  const queueOnly = new URLSearchParams(location.search).get("clip") === "production";');
    code=replace(code,'...(prepAtRiskOnly ? { prepAtRiskOnly } : { period: period.range }),\n  }), [restaurantId, prepAtRiskOnly, period.range]);','...(prepAtRiskOnly ? { prepAtRiskOnly } : { period: period.range }),\n    ...(queueOnly && mobile && restaurantId ? { limit: 1 } : {}),\n  }), [restaurantId, prepAtRiskOnly, period.range, queueOnly, mobile]);');
    for (const label of ['searchUnavailable','sortUnavailable']) {
      const icon=label==='searchUnavailable'?'general/search':'arrows/sorting';
      const action=`<span className={styles.tool}><Button size="sm" variant="ghost" intent="neutral" icon="${icon}" disabled aria-label={m.${label}} /></span>`;
      code=replace(code,action,`{!queueOnly && ${action}}`);
    }
    code=replace(code,'<Text variant="body-sm" className={styles.quiet}>{prepAtRiskOnly ? attention.current : m.summary}</Text>', '{!queueOnly && <Text variant="body-sm" className={styles.quiet}>{prepAtRiskOnly ? attention.current : m.summary}</Text>}');
    code=replace(code,'{found ? <><Text variant="body-sm" className={styles.quiet}>{m.continuation}', '{found && !queueOnly ? <><Text variant="body-sm" className={styles.quiet}>{m.continuation}');
    code=replace(code,'{ label: m.issue, width: styles.issueColumn }]', '...(!queueOnly ? [{ label: m.issue, width: styles.issueColumn }] : [])]');
    code=replace(code,'{order(value)}</TableCell><TableCell>{issue(value)}</TableCell>', '{order(value)}</TableCell>{!queueOnly && <TableCell>{issue(value)}</TableCell>}');
  }
  return code;
}
