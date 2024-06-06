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
  module.checkOut = (body) => {
    return repository.checkOut(body);
  };
  module.getLatestTrans = (trans_id) => {
    return repository.getLatestTrans(trans_id);
  };
  module.getLatestPenalty = (member_code) => {
    return repository.getLatestPenalty(member_code);
  };
  module.getPenaltyRemaining = (penaltyDate) => {
    return repository.getPenaltyRemaining(penaltyDate);
  };
  return module;
};
