const axios = require('axios');
const readline = require('readline');
const https = require('https');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const agent = new https.Agent({
  rejectUnauthorized: false
});

// Data Indonesia untuk generate random user
const indonesianFirstNames = [
  "Budi", "Siti", "Ahmad", "Dewi", "Eko", "Indah", "Rudi", "Sari", "Agus", "Rina",
  "Ari", "Lina", "Dedi", "Maya", "Fajar", "Nina", "Hadi", "Rita", "Joko", "Dina",
  "Rizki", "Sinta", "Andi", "Yuli", "Bambang", "Fitri", "Doni", "Lia", "Hendra", "Rika",
  "Asep", "Wati", "Iwan", "Susi", "Tono", "Dewi", "Yanto", "Eka", "Rian", "Mira",
  "Aji", "Nita", "Dani", "Rini", "Feri", "Sari", "Rama", "Dita", "Bayu", "Lia"
];

const indonesianLastNames = [
  "Santoso", "Sari", "Wijaya", "Kurniawan", "Prasetyo", "Sari", "Hidayat", "Dewi",
  "Setiawan", "Rahayu", "Kusuma", "Sari", "Nugroho", "Lestari", "Purnomo", "Sari",
  "Saputra", "Indah", "Maulana", "Sari", "Rahman", "Sari", "Hakim", "Sari",
  "Firmansyah", "Sari", "Ramadhan", "Sari", "Pratama", "Sari", "Siregar", "Sari",
  "Gunawan", "Sari", "Siregar", "Sari", "Siregar", "Sari", "Siregar", "Sari"
];

const indonesianCities = [
  { city: "Jakarta", districts: ["Jakarta Pusat", "Jakarta Selatan", "Jakarta Utara", "Jakarta Barat", "Jakarta Timur"], postCodes: ["10110", "12190", "14110", "11410", "13210"] },
  { city: "Surabaya", districts: ["Surabaya Pusat", "Surabaya Selatan", "Surabaya Utara", "Surabaya Barat", "Surabaya Timur"], postCodes: ["60111", "60264", "60175", "60118", "60293"] },
  { city: "Bandung", districts: ["Bandung Pusat", "Bandung Selatan", "Bandung Utara", "Bandung Barat", "Bandung Timur"], postCodes: ["40111", "40264", "40175", "40118", "40293"] },
  { city: "Medan", districts: ["Medan Pusat", "Medan Selatan", "Medan Utara", "Medan Barat", "Medan Timur"], postCodes: ["20111", "20264", "20175", "20118", "20293"] },
  { city: "Semarang", districts: ["Semarang Pusat", "Semarang Selatan", "Semarang Utara", "Semarang Barat", "Semarang Timur"], postCodes: ["50111", "50264", "50175", "50118", "50293"] },
  { city: "Makassar", districts: ["Makassar Pusat", "Makassar Selatan", "Makassar Utara", "Makassar Barat", "Makassar Timur"], postCodes: ["90111", "90264", "90175", "90118", "90293"] },
  { city: "Yogyakarta", districts: ["Yogyakarta Pusat", "Yogyakarta Selatan", "Yogyakarta Utara", "Yogyakarta Barat", "Yogyakarta Timur"], postCodes: ["55111", "55264", "55175", "55118", "55293"] },
  { city: "Palembang", districts: ["Palembang Pusat", "Palembang Selatan", "Palembang Utara", "Palembang Barat", "Palembang Timur"], postCodes: ["30111", "30264", "30175", "30118", "30293"] }
];

const streetNames = [
  "Jl. Merdeka", "Jl. Sudirman", "Jl. Gatot Subroto", "Jl. Thamrin", "Jl. Hayam Wuruk",
  "Jl. Gajah Mada", "Jl. Diponegoro", "Jl. Ahmad Yani", "Jl. Pahlawan", "Jl. Kartini",
  "Jl. Imam Bonjol", "Jl. Teuku Umar", "Jl. Cut Nyak Dien", "Jl. R.A. Kartini", "Jl. Soekarno Hatta",
  "Jl. Juanda", "Jl. Veteran", "Jl. Asia Afrika", "Jl. Braga", "Jl. Malioboro"
];

function generateRandomIndonesianData() {
  // Generate random name
  const firstName = indonesianFirstNames[Math.floor(Math.random() * indonesianFirstNames.length)];
  const lastName = indonesianLastNames[Math.floor(Math.random() * indonesianLastNames.length)];
  const fullName = `${firstName} ${lastName}`;
  
  // Generate random phone number (Indonesian format: 08xx-xxxx-xxxx)
  const phonePrefix = ["812", "813", "821", "822", "823", "831", "832", "833", "838", "852", "853", "855", "856", "857", "858", "859", "877", "878", "881", "882", "883", "884", "885", "886", "887", "888", "889", "895", "896", "897", "898", "899"];
  const selectedPrefix = phonePrefix[Math.floor(Math.random() * phonePrefix.length)];
  const phoneSuffix = Math.floor(Math.random() * 10000000).toString().padStart(8, '0');
  const phoneNumber = `08${selectedPrefix}${phoneSuffix}`;
  
  // Generate random birth date (age between 18-65 years old)
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - (Math.floor(Math.random() * 47) + 18); // 18-65 years old
  const birthMonth = Math.floor(Math.random() * 12) + 1;
  const birthDay = Math.floor(Math.random() * 28) + 1; // Use 28 to avoid month-end issues
  const birthDate = `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}`;
  
  // Generate random gender (1 for male, 2 for female)
  const gender = Math.random() > 0.5 ? "1" : "2";
  
  // Generate random address
  const cityData = indonesianCities[Math.floor(Math.random() * indonesianCities.length)];
  const district = cityData.districts[Math.floor(Math.random() * cityData.districts.length)];
  const postCode = cityData.postCodes[Math.floor(Math.random() * cityData.postCodes.length)];
  const street = streetNames[Math.floor(Math.random() * streetNames.length)];
  const streetNumber = Math.floor(Math.random() * 200) + 1;
  const fullStreet = `${street} No. ${streetNumber}`;
  
  // Generate email
  const emailSuffix = Math.floor(Math.random() * 9000) + 1000;
  const email = `${firstName.toLowerCase()}${lastName.toLowerCase()}${emailSuffix}@mailnesia.com`;
  
  // Generate username
  const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${emailSuffix}@mailnesia.com`;
  
  return {
    name: fullName,
    firstName: firstName,
    lastName: lastName,
    phone: phoneNumber,
    email: email,
    username: username,
    birthDate: birthDate,
    gender: gender,
    street: fullStreet,
    city: cityData.city,
    district: district,
    postCode: postCode
  };
}

async function createUser(referralCode) {
  for (let i = 0; i < 5; i++) {
    try {
      // Generate random Indonesian data
      const randomData = generateRandomIndonesianData();

      const data1 = {
        username: randomData.username,
        hp: randomData.phone
      };

      const response1 = await axios.post("https://api-fdc.ibbr.info/api/accountTemps/add", data1, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        httpsAgent: agent
      });

      const userId = response1.data?.item?.id;
      if (!userId) {
        console.log("Error: Could not create user.");
        continue;
      }

      const data2 = {
        id: userId,
        name: randomData.name,
        email: randomData.email,
        birthDate: randomData.birthDate,
        gender: randomData.gender,
        "address[street]": randomData.street,
        "address[city]": randomData.city,
        "address[district]": randomData.district,
        "address[postCode]": randomData.postCode
      };

      const response2 = await axios.put(`https://api-fdc.ibbr.info/api/accountTemps/${userId}/edit`, new URLSearchParams(data2).toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        },
        httpsAgent: agent
      });

      if (response2.data?.status !== "success") {
        console.log("Error: Could not edit user.");
        continue;
      }

      const data3 = {
        id: userId,
        password: "PentilPink2024",
        referralCode: referralCode
      };

      const response3 = await axios.post("https://api-fdc.ibbr.info/api/accountTemps/register", new URLSearchParams(data3).toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        },
        httpsAgent: agent
      });

      if (response3.data?.status === "success") {
        console.log("Registration Successfully");
      } else {
        console.log("Error: Registration failed.");
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
}

console.log("-=[ PENTIL.PINK ] =-");
console.log("Group: https://t.me/pentilreborn");
console.log("Channel: https://t.me/pentilpinkv2");
rl.question("Please enter the referral code: ", referralCode => {
  createUser(referralCode).then(() => {
    rl.close();
  });
});
