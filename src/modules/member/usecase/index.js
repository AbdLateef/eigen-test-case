module.exports = (repository) => {
  module.getAllMembers = () => {
    return repository.getAllMembers();
  };
  module.getMemberByCode = (code) => {
    return repository.getMemberByCode(code);
  };
  return module;
};
