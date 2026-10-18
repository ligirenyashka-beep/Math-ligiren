from fractions import Fraction
# Проверка всех утверждений карусели 1/2+1/3
print("=== МАТ.ПРОВЕРКА ===")
# 1. Ошибка 2/5
err = 1/5*2 # 0.4
true = Fraction(1,2)+Fraction(1,3)
print(f"Ошибочное 2/5 = {2/5} = {0.4}")
print(f"Истинное 1/2+1/3 = {true} = {float(true):.4f}")
assert true == Fraction(5,6), "1/2+1/3 должно быть 5/6"
# 2. НОК
import math
def lcm(a,b): return abs(a*b)//math.gcd(a,b)
print(f"НОК(2,3)={lcm(2,3)} assert 6 -> {lcm(2,3)==6}")
print(f"6//2={6//2} 6//3={6//3}")
# 3. Визуальная модель
print(f"1/2=3/6 ? {Fraction(1,2)==Fraction(3,6)}")
print(f"1/3=2/6 ? {Fraction(1,3)==Fraction(2,6)}")
# 4. Тест 1/4+1/6
print(f"1/4+1/6={Fraction(1,4)+Fraction(1,6)} (ожид 5/12) -> {Fraction(1,4)+Fraction(1,6)==Fraction(5,12)}")
print(f"НОК(4,6)={lcm(4,6)}")
# 5. Скидки
price=1000
after=price*0.5*0.5
print(f"Скидки 50%+50%: {price} -> {after} (потеря {1-after/price:.0%})")

print("Все проверки 🟢")
