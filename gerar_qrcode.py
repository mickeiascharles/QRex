import qrcode

url = input("Cole a URL: ").strip()

if not url:
    print("Nenhuma URL foi informada.")
    exit()

qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)

qr.add_data(url)
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")

img.save("qrcode.png")

print("QR Code gerado com sucesso!")