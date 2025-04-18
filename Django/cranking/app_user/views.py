from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    #return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'index.html')

'''
def kakao_login(request): # kakao login callback
    account = get_account_info(request)
    meta = get_meta_info(request)
    notifications = get_notification(request)

    if account["id"] != "": # if already login, redirect to main page
        return redirect("/")

    # kakao login
    code = request.GET["code"]
    state = request.GET["state"]

    # access token
    response = requests.post(
        "https://kauth.kakao.com/oauth/token", 
        headers = {
            "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        data = {
            "grant_type": "authorization_code",
            "client_id": "906d2296b11135e2e2f29c2dd9469abe",
            "client_secret": "hd93T14XADtbgyk4bad2BauoC5h8EEfN",
            "redirect_uri": "https://applifyapplications.com/accounts/kakao/login/callback/",
            "code": code,
            "state": state
        }
    ).json()
    access_token = response["access_token"]

    # email
    response = requests.post(
        "https://kapi.kakao.com/v2/user/me",
        headers = {
            "Authorization": "Bearer " + access_token,
            "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
        }
    ).json()
    email = response["kakao_account"]["email"]

    # check if the account exists
    account = mo.ACCOUNT.objects.filter(
        email = email,
        password = gl.SOCIAL_PASSWORD,
        status = 'n'
    ).first()
    if account != None: # if account exist
        user = authenticate(username=email, password=gl.SOCIAL_PASSWORD)
        user.backend = 'django.contrib.auth.backends.ModelBackend'
        login(request, user)
        return redirect("/")

    # create a new account
    mo.ACCOUNT( # register account
        email = email,
        password = gl.SOCIAL_PASSWORD,
        lang = meta["lang"],
        user_tokens = "",
        device_token = "",
        status = "n"
    ).save()

    user = User.objects.create_user( # create user
        username = email,
        password = gl.SOCIAL_PASSWORD
    )
    user.save()

    contexts = {
        "account": account,
        "meta": meta,
        "notifications": notifications,
    }

    # Debug mode(print logs)
    ut.print_debug_info(request, "def kakao_login(request): # kakao login callback", contexts)
    return render(request, "login_sns.html", contexts)

def naver_login(request): # naver login callback
    account = get_account_info(request)
    meta = get_meta_info(request)
    notifications = get_notification(request)

    # login check
    if account["id"] != "": # if already login, redirect to main page
        return redirect("/")

    # naver login
    code = request.GET["code"]
    state = request.GET["state"]

    # access token
    client_id = "RyBIInSM_f2GzGEmw1_Z"
    client_secret = "UDSjkhrvRr"
    parameters = f"grant_type=authorization_code&client_id={client_id}&client_secret={client_secret}&code={code}&state={state}"
    response = requests.get(
        f"https://nid.naver.com/oauth2.0/token?{parameters}"
    ).json()
    access_token = response.get("access_token")

    # email
    user_info_request = requests.get(
        "https://openapi.naver.com/v1/nid/me",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    user_info = user_info_request.json().get("response")
    email = user_info["email"]

    # check if the account exists
    account = mo.ACCOUNT.objects.filter(
        email = email,
        password = gl.SOCIAL_PASSWORD,
        status = 'n'
    ).first()
    if account != None: # if account exist
        user = authenticate(username=email, password=gl.SOCIAL_PASSWORD)
        user.backend = 'django.contrib.auth.backends.ModelBackend'
        login(request, user)
        return redirect("/")

    # create a new account
    mo.ACCOUNT( # register account
        email = email,
        password = gl.SOCIAL_PASSWORD,
        lang = meta["lang"],
        user_tokens = "",
        device_token = "",
        status = "n"
    ).save()

    user = User.objects.create_user( # create user
        username = email,
        password = gl.SOCIAL_PASSWORD
    )
    user.save()
    contexts = {
        "account": account,
        "meta": meta,
        "notifications": notifications,
    }

    # Debug mode(print logs)
    ut.print_debug_info(request, "def naver_login(request): # naver login callback", contexts)
    return render(request, "login_sns.html", contexts)

def apple_login(request): # apple login callback
    account = get_account_info(request)
    meta = get_meta_info(request)
    notifications = get_notification(request)

    # login check
    if account["id"] != "": # if already login, redirect to main page
        return redirect("/")

    # apple login
    state = request.POST["state"]
    code = request.POST["code"]
    id_token = request.POST["id_token"]

    # decode id_token
    decoded_token = jwt.decode(id_token, options={"verify_signature": False})

    # email
    email = decoded_token.get('email')

    # check if the account exists
    account = mo.ACCOUNT.objects.filter(
        email = email,
        password = gl.SOCIAL_PASSWORD,
        status = 'n'
    ).first()
    if account != None: # if account exist
        user = authenticate(username=email, password=gl.SOCIAL_PASSWORD)
        user.backend = 'django.contrib.auth.backends.ModelBackend'
        login(request, user)
        return redirect("/")

    # create a new account
    mo.ACCOUNT( # register account
        email = email,
        password = gl.SOCIAL_PASSWORD,
        lang = meta["lang"],
        user_tokens = "",
        device_token = "",
        status = "n"
    ).save()

    user = User.objects.create_user( # create user
        username = email,
        password = gl.SOCIAL_PASSWORD
    )
    user.save()

    contexts = {
        "account": account,
        "meta": meta,
        "notifications": notifications,
    }

    # Debug mode(print logs)
    ut.print_debug_info(request, "def apple_login(request): # apple login callback", contexts)
    return render(request, "login_sns.html", contexts)
'''