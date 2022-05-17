const TOKEN = '123';

function createRoom() {

    // curl --request POST \
    // --url https://api.daily.co/v1/rooms \
    // --header 'Authorization: Bearer $TOKEN' \
    // --header 'Content-Type: application/json' \

    fetch('https://api.daily.co/v1/rooms', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
        }
        }
    )
    .then(response => response.json())
    .then(room => room.url)
}

export { createRoom };
