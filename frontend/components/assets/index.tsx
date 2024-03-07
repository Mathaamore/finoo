import { useEffect, useState } from 'react';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Message } from 'primereact/message';
import { DataTable } from 'primereact/datatable';
import { FaStarOfLife } from "react-icons/fa";

// Context
import { useAuth } from '../../context/auth';

// Components
import DepositForm from './deposit';
import WithdrawForm from './withdraw';
import { Card, Container, TopSection, Trade, Info, BottomSection, NavMenu, DataSection } from './Elements';
import { Column } from 'primereact/column';


export default function Assets() {
    const [visible, setVisible] = useState(false);
    const [visibleWithdraw, setVisibleWithdraw] = useState(false);
    const [selectedDeposit, setSelectedDeposit] = useState(null);
    const [deposits, setDeposits] = useState([]);
    const [selected, setSelected] = useState("deposit");
    const { user } = useAuth();

    const withdrawBodyTemplate = (rowData) => {
        return (
            <Button type="button" icon="pi pi-credit-card" onClick={() => { setSelectedDeposit(rowData); setVisibleWithdraw(true) }} />
        )
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/trade/deposits`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setDeposits(data.data);
                } else {
                    console.error('error during deposit');
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (user) {
            fetchData();
        }
    }, [user]);

    return (
        <Container>
            <span className='title'>Locked Assets</span>
            <Dialog header="Deposit" draggable={false} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <DepositForm />
            </Dialog>
            <Dialog header="Withdraw" draggable={false} visible={visibleWithdraw} style={{ width: '50vw' }} onHide={() => setVisibleWithdraw(false)}>
                <WithdrawForm deposit={selectedDeposit}/>
            </Dialog>
            <TopSection>
                <Card>
                    <span>Primary Account</span>
                    {user ?
                        <span>{user.email}</span>
                        :
                        <span>Guest</span>

                    }
                </Card>
                <Trade>
                    <Message text="The current annual yield is 7%" />
                    <div className='balance'>
                        <span>Your Current Balance</span>
                        <span>${deposits.reduce((ac, val) => { return ac + (+val.amount) }, 0) | 0}</span>
                        <small>Locked inside our vault.</small>
                    </div>
                    <Button label='Deposit assets to balance' onClick={() => setVisible(true)} />
                </Trade>
                <Info>
                    <div className='separator' />
                    <div className='info-content'>
                        <FaStarOfLife style={{ width: '80px', height: '80px' }} />
                    </div>
                </Info>
            </TopSection>
            <BottomSection>
                <NavMenu>
                    <span className={selected === 'deposit' ? "selected" : ""} onClick={() => setSelected("deposit")}>Deposit History</span>
                </NavMenu>
                {selected === 'deposit' &&
                    <DataSection>
                        <DataTable paginator rows={5} value={deposits} tableStyle={{ minWidth: '50rem' }}>
                            <Column field="created_at" header="Date" dataType="date" />
                            <Column field="amount" header="Amount" dataType="numeric" />
                            <Column field="earnings" header="Earnings" dataType="numeric" />
                            <Column field="total_amount" header="Total" dataType="numeric" />
                            <Column
                                bodyStyle={{ textAlign: "center", overflow: "visible", width: '5%' }}
                                body={withdrawBodyTemplate}
                            />
                        </DataTable>
                        <br />
                        <br />
                    </DataSection>
                }
            </BottomSection>
        </Container>
    );
};