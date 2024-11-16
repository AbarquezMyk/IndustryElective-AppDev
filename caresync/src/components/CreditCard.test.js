import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import CreditCard from './CreditCard';

const mock = new MockAdapter(axios);

describe('CreditCard Component Tests', () => {
    beforeEach(() => {
        mock.reset();
    });

    test('should render saved cards from API', async () => {
        const mockCards = [
            {
                id: 1,
                cardholderName: 'John Doe',
                maskedCardNumber: '**** **** **** 1234',
                expirationDate: '2024-05-01',
            },
        ];

        mock.onGet('/api/cards').reply(200, mockCards);

        render(<CreditCard />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('**** **** **** 1234')).toBeInTheDocument();
            expect(screen.getByText('Expires: 2024-05')).toBeInTheDocument();
        });
    });

    test('should handle adding a new card', async () => {
        mock.onPost('/api/add_card').reply(200, {
            id: 2,
            cardholderName: 'Jane Doe',
            maskedCardNumber: '**** **** **** 5678',
            expirationDate: '2025-07-01',
        });

        render(<CreditCard />);

        fireEvent.change(screen.getByLabelText(/Cardholder Name/i), {
            target: { value: 'Jane Doe' },
        });
        fireEvent.change(screen.getByLabelText(/Card Number/i), {
            target: { value: '1234567812345678' },
        });
        fireEvent.change(screen.getByLabelText(/Expiration Date/i), {
            target: { value: '2025-07' },
        });
        fireEvent.change(screen.getByLabelText(/CVC/i), {
            target: { value: '123' },
        });

        fireEvent.click(screen.getByText(/Add Card/i));

        await waitFor(() => {
            expect(screen.getByText('Jane Doe')).toBeInTheDocument();
            expect(screen.getByText('**** **** **** 5678')).toBeInTheDocument();
        });
    });

    test('should handle editing a card', async () => {
        const existingCard = {
            id: 3,
            cardholderName: 'John Smith',
            maskedCardNumber: '**** **** **** 3456',
            expirationDate: '2023-11-01',
        };

        mock.onGet('/api/cards').reply(200, [existingCard]);
        mock.onPost('/api/edit_card/3').reply(200, {
            ...existingCard,
            cardholderName: 'John Updated',
        });

        render(<CreditCard />);

        await waitFor(() => {
            fireEvent.click(screen.getByText(/Edit/i));
        });

        fireEvent.change(screen.getByLabelText(/Cardholder Name/i), {
            target: { value: 'John Updated' },
        });

        fireEvent.click(screen.getByText(/Update Card/i));

        await waitFor(() => {
            expect(screen.getByText('John Updated')).toBeInTheDocument();
        });
    });

    test('should handle deleting a card', async () => {
        const cardId = 4;

        mock.onGet('/api/cards').reply(200, [
            {
                id: cardId,
                cardholderName: 'To Be Deleted',
                maskedCardNumber: '**** **** **** 7890',
                expirationDate: '2026-03-01',
            },
        ]);

        mock.onDelete(`/api/delete_card/${cardId}`).reply(204);

        render(<CreditCard />);

        await waitFor(() => {
            fireEvent.click(screen.getByText(/Delete/i));
        });

        fireEvent.click(screen.getByText(/Confirm/i));

        await waitFor(() => {
            expect(screen.queryByText('To Be Deleted')).not.toBeInTheDocument();
        });
    });

    test('should handle API errors gracefully', async () => {
        mock.onGet('/api/cards').reply(500);

        render(<CreditCard />);

        await waitFor(() => {
            expect(
                screen.getByText(/There was an error fetching the cards!/i)
            ).toBeInTheDocument();
        });
    });
});
