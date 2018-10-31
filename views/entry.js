var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
debugger;
var poolData = {
        UserPoolId : '',
        ClientId : ''
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

var cognitoUser = userPool.getCurrentUser();

if (cognitoUser != null) {
    cognitoUser.getSession(function(err, session) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        console.log(session);
        console.log('session validity: ' + session.isValid());
    
        //window.location.href = 'http://www.google.com';
    });
}


export function SignUp(c_name,c_mail,c_password){

  if((c_name==null) && (c_mail==null) && (c_password==null) ){
    c_name=$("#name").val();
    c_mail=$("#mail").val();
    console.log("i am here");
    c_password=$("#pass").val();
}
    console.log(c_mail);
    console.log(c_name);
    console.log(c_password);
    c_name = c_name.split(' ').join('_');
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
        Name :"email",
        Value :c_mail
    };

    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);
    var dataName = {
        Name :"name",
        Value :c_name
    };
    var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
    attributeList.push(attributeName);

    var cognitoUser;
    userPool.signUp(c_name, c_password, attributeList, null, function(err, result){
        if (err) {
          console.log(err);
            alert(err);
            return;
        }
        cognitoUser = result.user;
        alert("successfully signed up");
        //SignIn(c_mail, c_password);
        console.log('user name is ' + cognitoUser.getUsername());
    });

};
export function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    var c_name= profile.getName();
    var c_mail=profile.getEmail();
    var c_password= 'Google'+profile.getId();
    SignUp(c_name,c_mail,c_password);

}

function onFailure(error) {
console.log(error);
        }
export function SignIn(){

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
       Username : '',
       Pool : userPool
   };
  
    var authenticationData = {
        Username : '',
        Password : '',
    };
    
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    
    cognitoUser.authenticateUser(authenticationDetails, {
           onSuccess: function (result) {

           var accessToken = result.getAccessToken().getJwtToken();
           
           alert("Successful");
           //var cognitoUser = userPool.getCurrentUser();
           
      //console.log(result);
      AWS.config.region = 'ap-south-1';
      //
      var creds = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: '',
             Logins: {
                  'cognito-idp.ap-south-1.amazonaws.com/': result.getIdToken().getJwtToken()}
      });

      console.log(creds);

      creds.refresh(function(err, data){
            if(err) console.log(err);
            else{
                console.log("HERE");
                console.log(creds);
            }
      });
      },
       onFailure: function(err) {
         
           console.log(JSON.stringify(err));
		   alert("Wow an error!");
       }
   });
};
