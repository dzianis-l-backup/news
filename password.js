 var userId;
    function select(){
        var xhr = new XMLHttpRequest();
        xhr.open("POST","http://46.101.128.92:3000/api/db_query" ,true);
        xhr.onreadystatechange = function(){
            if(this.readyState!=4)
                return;
            if(this.status == 200){
                userId = JSON.parse(xhr.responseText)[0].patient_id;
            }

            else {
                console.log('id error')
            }



        }

        var url = window.location.href.split("password/")[1];
        var dbReq =  "SELECT `patient_id` FROM  `patient_credentials`   WHERE temp_url ='"+url+"'";
        var request = {
            authToken:"234",
            dbReq:dbReq
        }


        xhr.timeout = 30000;
        xhr.ontimeout = function(){
            alert("Error: request failed;")
        }


        xhr.setRequestHeader("Content-Type","application/json");
        var serialized = JSON.stringify(request);
        xhr.send(serialized);
    }
select();



    function send(){
        if(pas.value!=confpas.value){
            alert("wrong password confirmation");
            return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST","http://46.101.128.92:3000/api/db_query" ,true);
        xhr.onreadystatechange = function(){
            if(this.readyState!=4)
                return;
            if(this.status == 200){
                alert("Success: password has  been changed;")

            }

            else {
                alert("Error: password has not been changed;")
            }



        }
        var dbReq =  "UPDATE `patient_credentials` set `password`='"+pas.value+"'  WHERE patient_id='"+userId+"'";
        var request = {
            authToken:"234",
            dbReq:dbReq
        }


        xhr.timeout = 30000;
        xhr.ontimeout = function(){
            alert("Error: request failed;")
        }


        xhr.setRequestHeader("Content-Type","application/json");
        var serialized = JSON.stringify(request);
        xhr.send(serialized);

    }

