const Bus = require('./Bus');
const Booking = require('./Booking');
const User = require('./User');




// now define relation

User.hasMany(Booking,{foreignKey:'userId'});
Booking.belongsTo(User,{foreignKey:'userId'});

// now bus and booking
Bus.hasMany(Booking,{foreignKey:'busId'});
Booking.belongsTo(Bus,{foreignKey:'busId'});

//  now relations ships has been stablished so just export them all

module.exports = {Bus,Booking,User};