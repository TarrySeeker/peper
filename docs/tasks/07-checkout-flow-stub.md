---
id: 07
title: Checkout — многошаговый stub
status: todo
agent: commerce-logic → frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Дать пользователю оформить заказ — даже без реальной оплаты. Заявка сохраняется в localStorage; "оплата" имитируется. Это необходимо для тестирования воронки и красивой витрины.

## Контекст
- Сейчас `app/cart/page.tsx` + `components/CartView.tsx` показывают корзину, но кнопки "Оформить заказ" нет (или она ведёт в никуда — проверить).
- Стор корзины — `lib/store.ts` (Zustand, ключ `paper-fairies-cart-v1`).
- Новый поток: `/checkout` с 4 шагами: 1) контакты, 2) доставка, 3) "оплата", 4) подтверждение.
- Заказы хранятся в localStorage под ключом `paper-fairies-orders-v1` — массив объектов.

## Acceptance criteria
**Часть 1 — commerce-logic:**
- [ ] В `types/index.ts` добавлены типы `Order`, `OrderStatus`, `CustomerInfo`, `DeliveryInfo`, `PaymentMethod` (union: `card | sbp | cod`).
- [ ] В `lib/store.ts` (или новый `lib/orders.ts`) — функции `saveOrder(order)`, `getOrders()`, `getOrderById(id)`, persist в `paper-fairies-orders-v1`.
- [ ] Валидаторы: `validateCustomer(info)`, `validateDelivery(info)` — возвращают `{ ok: true } | { ok: false, errors }`.
- [ ] Функция `createOrderFromCart(cart, customer, delivery, payment): Order` (генерит id, timestamp, totals).
- [ ] После успешного создания заказа корзина очищается (`clear()`).

**Часть 2 — frontend-builder:**
- [ ] Создан `app/checkout/page.tsx` (client component) — управляет шагами через локальный state (без URL-роутинга для шагов).
- [ ] Шаг 1: форма имя/email/телефон с валидацией на blur.
- [ ] Шаг 2: способ доставки (СДЭК/Почта/курьер), адрес.
- [ ] Шаг 3: способ оплаты (карта/СБП/наложенный) — без реальной интеграции, только выбор.
- [ ] Шаг 4: подтверждение с резюме заказа + кнопка "Оформить" → сохраняет, очищает корзину, редирект на `/checkout/success?orderId=...`.
- [ ] Создан `app/checkout/success/page.tsx` — благодарность + номер заказа.
- [ ] В `components/CartView.tsx` кнопка "Оформить заказ" ведёт на `/checkout`, дизейблится при пустой корзине.
- [ ] Прогресс-индикатор шагов вверху, можно ходить назад (вперёд — только если текущий шаг валиден).
- [ ] Стилизация в палитре, адаптив, focus-visible.

## Не входит в задачу
- Реальная платёжная интеграция (ЮKassa, СберPay).
- Email-уведомления.
- Регистрация заказа на бэкенде (бэкенда нет).
- История заказов в личном кабинете — это задача 10.

## Артефакты
_Заполняется по факту._

## Заметки исполнения
_Заполняется по факту._
