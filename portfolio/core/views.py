from django.shortcuts import render

def home(request):
    return render(request, 'core/index.html')

def contact_form(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        # اینجا میتونی ایمیل بفرستی یا تو دیتابیس ذخیره کنی
        print(f"پیام جدید از {name} - {email}: {message}")
    return render(request, 'core/index.html')