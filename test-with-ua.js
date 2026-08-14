const https = require('https');

const candidateIds = [
  'photo-1601049541289-9b1b7bbbfe19', // Cream jar
  'photo-1612817288484-6f916006741a', // Dropper bottles
  'photo-1596462502278-27bfdc403348', // Cosmetics setup
  'photo-1600612229986-50db50b9b3cc', // Cleanser/cosmetic tube
  'photo-1611080626919-7cf5a9dbab5b', // Skincare bottle
  'photo-1601597111158-2fceff292cac', // Skincare cream
  'photo-1631214524020-5e1841b6e92a', // Dropper bottle
  'photo-1631214524001-f2f21626e2e5', // Dropper bottle
  'photo-1526947425960-945c6e72858f', // Skincare setup
  'photo-1620916566352-7e779a557b77', // Skincare setup
  'photo-1631730359877-ee87dfa4ad0f', // Skincare setup
  'photo-1617897903246-719242758050', // Vitamin C
  'photo-1512290900672-1f02e1c07e05', // Rosehip seed oil
  'photo-1601049676099-e7ed07d825b0', // Raspberry seed SPF
  'photo-1611080501716-e575822ee40b', // Papaya polish
  'photo-1608571424266-eedbb7f3897f', // Sea kelp cream / Pink clay
  'photo-1629732047847-50219e9c5aef', // Copper peptide
  'photo-1620917670357-5a9a11ded9cd', // Eye cream
  'photo-1601612620962-2a4ba6b3bd33', // Eye balm
  'photo-1626806787426-5910811b6325', // SPF tube
  'photo-1624601605854-e0e6484de54a', // Invisible SPF fluid
  'photo-1610986518712-40292723bb73', // Sun gel
  'photo-1608571423902-eed4a5ad8108', // Micro-peel
  'photo-1631730359577-38e47be02194', // Exfoliating paste
  'photo-1631730359312-38e47be02194', // AHA + BHA peel
  'photo-1626806787461-102c1bfaaea1', // Green clay mask
  'photo-1590156546746-c58d7f044450', // Volcanic clay mask
  'photo-1628149455678-16f37bc392f4', // Charcoal mask
  'photo-1608248597359-253b51ef8a3d', // Toner mist
  'photo-1614608682850-e0d6ed316d47', // Rose hydrosol
  'photo-1620916566398-39f1143ab7be', // Glow toner
  'photo-1598440947619-2c35fc9aa908', // Hyaluronic essence
];

function checkUrl(id) {
  return new Promise((resolve) => {
    const url = `https://images.unsplash.com/${id}?q=80&w=1000&auto=format&fit=crop`;
    const options = {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    https.request(url, options, (res) => {
      resolve({ id, statusCode: res.statusCode });
    }).on('error', (err) => {
      resolve({ id, statusCode: 500, error: err.message });
    }).end();
  });
}

async function run() {
  console.log(`Checking ${candidateIds.length} Unsplash IDs with User-Agent...`);
  const results = await Promise.all(candidateIds.map(checkUrl));
  results.forEach(r => {
    console.log(`${r.id}: ${r.statusCode}`);
  });
}

run();
