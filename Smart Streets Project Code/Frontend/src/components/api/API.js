const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:4002';

const headers = {
    'Accept': 'application/json'
};

export const getAllSensors = (payload) =>
    fetch(`${api}/getAll`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;

          });


          export const addCNode = (payload) =>
              fetch(`${api}/add/clusterNode`, {
                  method: 'POST',
                  headers: {
                      ...headers,
                      'Content-Type': 'application/json'
                  },
                  credentials:'include',
                  body: JSON.stringify(payload)
              }).then(res => {
                  console.log(res);
                  return res.json();
              })
                  .catch(error => {
                      console.log("This is error");
                      return error;
                  });

                  export const addSNode = (payload) =>
                      fetch(`${api}/add/smartNode`, {
                          method: 'POST',
                          headers: {
                              ...headers,
                              'Content-Type': 'application/json'
                          },
                          credentials:'include',
                          body: JSON.stringify(payload)
                      }).then(res => {
                          console.log(res);
                          return res.json();
                      })
                          .catch(error => {
                              console.log("This is error");
                              return error;
                          });


                          export const addNode = (payload) =>
                              fetch(`${api}/add/sensorNode`, {
                                  method: 'POST',
                                  headers: {
                                      ...headers,
                                      'Content-Type': 'application/json'
                                  },
                                  credentials:'include',
                                  body: JSON.stringify(payload)
                              }).then(res => {
                                  console.log(res);
                                  return res.json();
                              })
                                  .catch(error => {
                                      console.log("This is error");
                                      return error;
                                  });



                                  export const updateCNode = (payload) =>
                                      fetch(`${api}/update/clusterNode`, {
                                          method: 'POST',
                                          headers: {
                                              ...headers,
                                              'Content-Type': 'application/json'
                                          },
                                          credentials:'include',
                                          body: JSON.stringify(payload)
                                      }).then(res => {
                                          console.log(res);
                                          return res.json();
                                      })
                                          .catch(error => {
                                              console.log("This is error");
                                              return error;
                                          });




                                          export const updateSNode = (payload) =>
                                              fetch(`${api}/update/smartNode`, {
                                                  method: 'POST',
                                                  headers: {
                                                      ...headers,
                                                      'Content-Type': 'application/json'
                                                  },
                                                  credentials:'include',
                                                  body: JSON.stringify(payload)
                                              }).then(res => {
                                                  console.log(res);
                                                  return res.json();
                                              })
                                                  .catch(error => {
                                                      console.log("This is error");
                                                      return error;
                                                  });




                                                  export const updateNode = (payload) =>
                                                      fetch(`${api}/update/sensorNode`, {
                                                          method: 'POST',
                                                          headers: {
                                                              ...headers,
                                                              'Content-Type': 'application/json'
                                                          },
                                                          credentials:'include',
                                                          body: JSON.stringify(payload)
                                                      }).then(res => {
                                                          console.log(res);
                                                          return res.json();
                                                      })
                                                          .catch(error => {
                                                              console.log("This is error");
                                                              return error;
                                                          });





                                                          export const deleteCNode = (payload) =>
                                                              fetch(`${api}/delete/clusterNode`, {
                                                                  method: 'POST',
                                                                  headers: {
                                                                      ...headers,
                                                                      'Content-Type': 'application/json'
                                                                  },
                                                                  credentials:'include',
                                                                  body: JSON.stringify(payload)
                                                              }).then(res => {
                                                                  console.log(res);
                                                                  return res.json();
                                                              })
                                                                  .catch(error => {
                                                                      console.log("This is error");
                                                                      return error;
                                                                  });

                                                                  export const deleteSNode = (payload) =>
                                                                      fetch(`${api}/delete/smartNode`, {
                                                                          method: 'POST',
                                                                          headers: {
                                                                              ...headers,
                                                                              'Content-Type': 'application/json'
                                                                          },
                                                                          credentials:'include',
                                                                          body: JSON.stringify(payload)
                                                                      }).then(res => {
                                                                          console.log(res);
                                                                          return res.json();
                                                                      })
                                                                          .catch(error => {
                                                                              console.log("This is error");
                                                                              return error;
                                                                          });

                                                                          export const deleteNode = (payload) =>
                                                                              fetch(`${api}/delete/sensorNode`, {
                                                                                  method: 'POST',
                                                                                  headers: {
                                                                                      ...headers,
                                                                                      'Content-Type': 'application/json'
                                                                                  },
                                                                                  credentials:'include',
                                                                                  body: JSON.stringify(payload)
                                                                              }).then(res => {
                                                                                  console.log(res);
                                                                                  return res.json();
                                                                              })
                                                                                  .catch(error => {
                                                                                      console.log("This is error");
                                                                                      return error;
                                                                                  });
