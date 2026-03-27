import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const RP_API = process.env.RP_API_URL || 'http://localhost:8081';
const LAUNCH = process.env.RP_LAUNCH_NAME || 'Playwright Tests';
const PROJECT = process.env.RP_PROJECT || 'Default';

async function main() {
  const reportFile = 'reports/junit-report.xml';
  if (!fs.existsSync(reportFile)) {
    console.error('No report file found:', reportFile);
    process.exit(1);
  }

  const form = new FormData();
  form.append('file', fs.createReadStream(reportFile));

  console.log('Uploading result to ReportPortal...');
  const res = await axios.post(
    `${RP_API}/api/${PROJECT}/xmlreport`,
    form,
    {
      headers: {
        ...form.getHeaders(),
        'Authorization': `bearer ${process.env.RP_TOKEN}`,
      },
    }
  );

  console.log('Upload response:', res.status, res.data);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});