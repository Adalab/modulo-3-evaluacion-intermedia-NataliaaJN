const getStudents= () => {
    return fetch("https://beta.adalab.es/pw-recursos/apis/adalabers-v1/promo-patata.json")
        .then(response=> response.json());
};

export default getStudents;