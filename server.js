
});

async function run() {
    try {
       
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })  

    } catch (error) {
        console.log(error);
    }
       
    }

run().catch(console.dir);