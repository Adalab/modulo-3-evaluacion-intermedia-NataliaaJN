const getStudents= () => {
    return fetch("//beta.adalab.es/pw-recursos/apis/adalabers-v1/promo-patata.json")
        .then(response=> response.json());
};

export default getStudents;