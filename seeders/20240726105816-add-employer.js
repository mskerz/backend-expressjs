
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash('12345', 10); // เข้ารหัสรหัสผ่าน

    return queryInterface.bulkInsert('user_employers', [
      {
        company_name: 'Tech Innovations Ltd',
        employee_email: 'contact@techinnovations.com',
        password: password,
        company_address: '123 Tech Avenue, Silicon Valley, CA',
        company_phone: '123-456-7890',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_name: 'Creative Solutions Inc',
        employee_email: 'info@creativesolutions.com',
        password: password,
        company_address: '456 Creative Blvd, New York, NY',
        company_phone: '987-654-3210',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_name: 'Future Enterprises',
        employee_email: 'support@futureenterprises.com',
        password: password,
        company_address: '789 Future Road, Austin, TX',
        company_phone: '555-123-4567',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_name: 'Digital Dreams Co.',
        employee_email: 'hr@digitaldreams.com',
        password: password,
        company_address: '234 Dream St, San Francisco, CA',
        company_phone: '444-567-8901',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_name: 'Innovatech Corp.',
        employee_email: 'jobs@innovatech.com',
        password: password,
        company_address: '567 Innovation Dr, Boston, MA',
        company_phone: '222-333-4444',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_name: 'Cyber Solutions',
        employee_email: 'contact@cybersolutions.com',
        password: password,
        company_address: '890 Cyber Lane, Seattle, WA',
        company_phone: '111-222-3333',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_name: 'TechWave Partners',
        employee_email: 'info@techwave.com',
        password: password,
        company_address: '123 TechWave Blvd, Miami, FL',
        company_phone: '888-999-0000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_name: 'FutureTech Global',
        employee_email: 'contact@futuretechglobal.com',
        password: password,
        company_address: '456 FutureTech Way, Austin, TX',
        company_phone: '777-888-9999',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_name: 'Visionary Labs',
        employee_email: 'jobs@visionarylabs.com',
        password: password,
        company_address: '789 Visionary Blvd, Los Angeles, CA',
        company_phone: '555-444-3333',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_name: 'TechPioneers Inc.',
        employee_email: 'careers@techpioneers.com',
        password: password,
        company_address: '101 Pioneer St, Chicago, IL',
        company_phone: '666-777-8888',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user_employers', null, {});
  }
};
