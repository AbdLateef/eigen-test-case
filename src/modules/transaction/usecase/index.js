module.exports = (repository) => {
  module.checkAvailability = (body) => {
    return repository.checkAvailability(body);
  };
  module.checkTransInprogress = (member_code) => {
    return repository.checkTransInprogress(member_code);
  };
  module.checkIn = (body) => {
    return repository.checkIn(body);
  };
  return module;
};
