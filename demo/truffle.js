module.exports = {
  contracts_build_directory: "./src/build",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // match any network
    }
  }
};
