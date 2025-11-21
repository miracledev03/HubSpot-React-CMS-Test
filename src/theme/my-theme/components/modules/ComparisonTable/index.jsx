import {
  ModuleFields,
  TextField,
  RichTextField,
  BooleanField,
  ChoiceField,
  RepeatedFieldGroup,
} from '@hubspot/cms-components/fields';

import styles from '../../../styles/comparison-table.module.css';

const CheckIcon = () => (
  <svg
    className={styles.checkIcon}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 16.2001L5.5 12.7001C5.11 12.3101 4.49 12.3101 4.1 12.7001C3.71 13.0901 3.71 13.7101 4.1 14.1001L8.29 18.2901C8.68 18.6801 9.31 18.6801 9.7 18.2901L20.3 7.70007C20.69 7.31007 20.69 6.69007 20.3 6.30007C19.91 5.91007 19.29 5.91007 18.9 6.30007L9 16.2001Z"
      fill="#242727"
    />
  </svg>
);

const HelperIcon = () => (
  <svg
    className={styles.featureHelper}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <g clipPath="url(#clip0_5804_352)">
      <path
        d="M8.00065 7.33325C7.63246 7.33325 7.33398 7.63173 7.33398 7.99992V10.6666C7.33398 11.0348 7.63246 11.3333 8.00065 11.3333C8.36884 11.3333 8.66732 11.0348 8.66732 10.6666V7.99992C8.66732 7.63173 8.36884 7.33325 8.00065 7.33325Z"
        fill="#242727"
      />
      <path
        d="M7.99935 6.33329C7.53911 6.33329 7.16602 5.9602 7.16602 5.49996C7.16602 5.03972 7.53911 4.66663 7.99935 4.66663C8.45959 4.66663 8.83268 5.03972 8.83268 5.49996C8.83268 5.9602 8.45959 6.33329 7.99935 6.33329Z"
        fill="#242727"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.33398 7.99992C1.33398 4.31992 4.32065 1.33325 8.00065 1.33325C11.6807 1.33325 14.6673 4.31992 14.6673 7.99992C14.6673 11.6799 11.6807 14.6666 8.00065 14.6666C4.32065 14.6666 1.33398 11.6799 1.33398 7.99992ZM2.66732 7.99992C2.66732 10.9399 5.06065 13.3333 8.00065 13.3333C10.9406 13.3333 13.334 10.9399 13.334 7.99992C13.334 5.05992 10.9406 2.66659 8.00065 2.66659C5.06065 2.66659 2.66732 5.05992 2.66732 7.99992Z"
        fill="#242727"
      />
    </g>
    <defs>
      <clipPath id="clip0_5804_352">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export function Component({ fieldValues }) {
  const {
    heading = 'Compare features from all our plans',
    plans = [],
    sections = [],
  } = fieldValues || {};

  if (!plans.length) {
    return (
      <section className={styles.wrapper}>
        <p>No plans</p>
      </section>
    );
  }

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h2 className={styles.title}>{heading}</h2>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.table} aria-label="Plan comparison">
          <colgroup>
            <col className={styles.colFeature} />
            {plans.map((plan, i) => (
              <col
                key={i}
                className={
                  styles.colPlan +
                  (plan.highlighted ? ' ' + styles.planCardHighlighted : '')
                }
              />
            ))}
          </colgroup>

          {/* Top header row with plans */}
          <thead>
            <tr>
              <th className={styles.planLabelCell}>
                <div className={styles.planLabel}>
                  <div className={styles.planLabelTitle}>Compare plans</div>
                  <div className={styles.planLabelSub}>
                    All prices per month + IVA, billed yearly
                  </div>
                </div>
              </th>

              {plans.map((plan, i) => (
                <th key={i} scope="col" className={styles.planHeaderCell}>
                  <div
                    className={
                      styles.planCard +
                      (plan.highlighted ? ' ' + styles.planCardHighlighted : '')
                    }
                  >
                    <div className={styles.planName}>{plan.planName}</div>

                    <div className={styles.planPriceRow}>
                      <span className={styles.planPrice}>{plan.price}</span>
                      {plan.originalPrice && (
                        <span className={styles.planOriginalPrice}>
                          {plan.originalPrice}
                        </span>
                      )}
                    </div>

                    <div
                      className={styles.planPromo}
                      dangerouslySetInnerHTML={{ __html: plan.promoText }}
                    />

                    {plan.ctaLabel && (
                      <button className={styles.planCta} type="button">
                        {plan.ctaLabel}
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Sections + feature rows */}
          <tbody>
            {(sections || []).map((section, sIdx) => {
              const featureRows = (section.rows || []).map((row, rIdx) => (
                <tr key={`row-${sIdx}-${rIdx}`} className={styles.featureRow}>
                  <th scope="row" className={styles.featureCell}>
                    <div className={styles.featureLabelWrapper}>
                      <span className={styles.featureLabel}>
                        {row.rowLabel}
                      </span>
                      {row.helperText && (
                        <span title={row.helperText}>
                          <HelperIcon />
                        </span>
                      )}
                    </div>
                  </th>

                  {plans.map((_, pIdx) => {
                    const cell = (row.values || [])[pIdx];

                    if (!cell || cell.type === 'blank') {
                      return (
                        <td key={pIdx} className={styles.valueCell} />
                      );
                    }

                    if (cell.type === 'check') {
                      return (
                        <td key={pIdx} className={styles.valueCell}>
                          <span className={styles.valueCheck}>
                            <CheckIcon />
                          </span>
                        </td>
                      );
                    }

                    return (
                      <td key={pIdx} className={styles.valueCell}>
                        <span className={styles.valueText}>
                          {cell.textValue}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ));

              // Section title row + all its feature rows
              return [
                <tr key={`section-${sIdx}`} className={styles.sectionRow}>
                  <th scope="row" className={styles.sectionTitleCell}>
                    <span className={styles.sectionTitle}>
                      {section.title}
                    </span>
                  </th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>,
                ...featureRows,
              ];
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ---------- Fields with default content matching the design ---------- */

export const fields = (
  <ModuleFields>
    <TextField
      name="heading"
      label="Heading"
      default="Compare features from all our plans"
    />

    {/* PLANS (columns) */}
    <RepeatedFieldGroup
      name="plans"
      label="Plans (columns)"
      occurrence={{ min: 1, max: 4, default: 3 }}
      default={[
        {
          planName: 'Starter',
          price: '€34',
          originalPrice: '€69',
          promoText: '<p><b>Save 20% off</b> for the first 2 months</p>',
          ctaLabel: 'Get started',
          highlighted: false,
        },
        {
          planName: 'Plus',
          price: '€45',
          originalPrice: '€89',
          promoText: '<p><b>Save 20% off</b> for the first 2 months</p>',
          ctaLabel: 'Get started',
          highlighted: true,
        },
        {
          planName: 'VIP',
          price: '€59',
          originalPrice: '€119',
          promoText: '<p><b>Save 20% off</b> for the first 2 months</p>',
          ctaLabel: 'Get started',
          highlighted: false,
        },
      ]}
    >
      <TextField
        name="planName"
        label="Plan name"
        required
      />
      <TextField name="price" label="Price" required />
      <TextField name="originalPrice" label="Original price" />
      <RichTextField
        name="promoText"
        label="Promo text"
        default="<p><b>Save 20% off</b> for the first 2 months</p>"
      />
      <TextField
        name="ctaLabel"
        label="Button label"
        default="Get started"
      />
      <BooleanField
        name="highlighted"
        label="Highlight plan"
        default={false}
      />
    </RepeatedFieldGroup>

    {/* SECTIONS + rows + cells */}
    <RepeatedFieldGroup
      name="sections"
      label="Feature sections"
      occurrence={{ min: 1, max: 4, default: 3 }}
      default={[
        {
          title: 'Increase visibility and reputation',
          rows: [
            {
              rowLabel: 'Marketplace profile',
              helperText: 'Marketplace profile',
              values: [
                { type: 'check' },
                { type: 'check' },
                { type: 'text', textValue: 'Enhanced' },
              ],
            },
            {
              rowLabel: 'Statistics performance',
              helperText: 'Statistics performance',
              values: [
                { type: 'text', textValue: 'Basic' },
                { type: 'text', textValue: 'Basic' },
                { type: 'text', textValue: 'Enhanced' },
              ],
            },
            {
              rowLabel: 'Opinion requests',
              helperText: 'Opinion requests',
              values: [
                { type: 'check' },
                { type: 'check' },
                { type: 'check' },
              ],
            },
          ],
        },
        {
          title: 'Streamline booking management',
          rows: [
            {
              rowLabel: 'Online agenda',
              helperText: 'Online agenda',
              values: [
                { type: 'check' },
                { type: 'check' },
                { type: 'check' },
              ],
            },
            {
              rowLabel: 'Appointment reminders',
              helperText: 'Appointment reminders',
              values: [
                { type: 'text', textValue: 'Email, App' },
                { type: 'text', textValue: 'Email, App, SMS' },
                { type: 'text', textValue: 'Email, App, SMS' },
              ],
            },
            {
              rowLabel: 'Waiting list',
              values: [
                { type: 'blank' },
                { type: 'blank' },
                { type: 'check' },
              ],
            },
            {
              rowLabel: 'Online payments',
              helperText: 'Online payments',
              values: [
                { type: 'check' },
                { type: 'check' },
                { type: 'text', textValue: 'Lower commissions' },
              ],
            },
            {
              rowLabel: 'Omnichannel booking widgets',
              helperText: 'Omnichannel booking widgets',
              values: [
                { type: 'check' },
                { type: 'check' },
                { type: 'check' },
              ],
            },
          ],
        },
        {
          title: 'Enhance patient visits',
          rows: [
            {
              rowLabel: 'Digital medical record',
              helperText: 'Digital medical record',
              values: [
                { type: 'blank' },
                { type: 'check' },
                { type: 'check' },
              ],
            },
            {
              rowLabel: 'Video consultation',
              helperText: 'Video consultation',
              values: [
                { type: 'check' },
                { type: 'check' },
                { type: 'check' },
              ],
            },
            {
              rowLabel: 'Digital prescriptions',
              helperText: 'Digital prescriptions',
              values: [
                { type: 'blank' },
                { type: 'check' },
                { type: 'check' },
              ],
            },
          ],
        },
        {
          title: 'Increase patient retention',
          rows: [
            {
              rowLabel: 'Email and SMS campaigns',
              helperText: 'Email and SMS campaigns',
              values: [
                { type: 'text', textValue: '300 / month' },
                { type: 'text', textValue: '1000 / month' },
                { type: 'text', textValue: '5000 / month' },
              ],
            },
            {
              rowLabel: 'In app chat',
              helperText: 'In app chat',
              values: [
                { type: 'check' },
                { type: 'check' },
                { type: 'check' },
              ],
            },
            {
              rowLabel: 'Vouchers',
              helperText: 'Vouchers',
              values: [
                { type: 'check' },
                { type: 'check' },
                { type: 'check' },
              ],
            },
          ],
        },
      ]}
    >
      <TextField
        name="title"
        label="Section title"
        required
      />

      <RepeatedFieldGroup
        name="rows"
        label="Rows in this section"
        occurrence={{ min: 0, max: 50, default: 0 }}
      >
        <TextField
          name="rowLabel"
          label="Row label"
          required
        />
        <TextField
          name="helperText"
          label="Helper text (tooltip)"
        />

        <RepeatedFieldGroup
          name="values"
          label="Values (one per plan, in order)"
          occurrence={{ min: 0, max: 4, default: 3 }}
        >
          <ChoiceField
            name="type"
            label="Cell type"
            default="blank"
            display="select"
            choices={[
              ['check', 'Check'],
              ['text', 'Text'],
              ['blank', 'Blank'],
            ]}
          />

          <TextField
            name="textValue"
            label="Text value (for Text type)"
          />
        </RepeatedFieldGroup>
      </RepeatedFieldGroup>
    </RepeatedFieldGroup>
  </ModuleFields>
);

export const meta = {
  label: 'Comparison table',
};
