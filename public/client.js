console.log('Client-side code running');

const button = document.getElementById('myButton');
button.addEventListener('click', function(e) {
  console.log('button was clicked');

  fetch('/clicked', {method: 'GET'})
    .then(res => {
        if (res.ok) {
        return res.json();
        } else {
        throw new Error("Oops! Something went wrong");
        }
    })
    .then(json => {
        console.log(json); // response body here
        var stringa = JSON.stringify(json);
        var obj = JSON.parse(stringa);
        var ans1 = obj.ans1;
        var ans2 = obj.ans2;
        var ans3 = obj.ans3;
        var answer = obj.value;
        // return dispatch(getAllQuestionnairesSuccess(json));

        document.getElementById('ans1').innerHTML = `First number: ${ans1} `;
        document.getElementById('ans2').innerHTML = `Solve By: ${ans2} `;
        document.getElementById('ans3').innerHTML = `Second number: ${ans3} `;
        document.getElementById('counter').innerHTML = `Answer is: ${answer} `;
    })
    .catch((error) => {
        assert.isNotOk(error,'Promise error');
        done();
    });
});