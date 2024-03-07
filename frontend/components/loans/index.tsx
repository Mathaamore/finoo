import { useEffect, useState } from 'react';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';

// Context
import { useAuth } from '../../context/auth';

// Components
import AskForm from './ask';
import RepayForm from './repay';
import { Container, TopSection, TopBlock, BottomSection, NavMenu, DataSection } from './Elements';
import { Column } from 'primereact/column';
import { FaDollarSign, FaFileSignature, FaSubscript } from 'react-icons/fa';


export default function Loans() {
    const [visibleAsk, setVisibleAsk] = useState(false);
    const [visibleRepay, setVisibleRepay] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState(null);    const [loans, setLoans] = useState([]);
    const [selected, setSelected] = useState("current");
    const { user } = useAuth();

    const repayBodyTemplate = (rowData) => {
        return (
            <Button type="button" icon="pi pi-credit-card" onClick={() => {setSelectedLoan(rowData); setVisibleRepay(true)}} />
        )
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/trade/loans`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setLoans(data.data);
                } else {
                    console.error('error during fetching loans');
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
            <span className='title'>Loans Manager</span>
            <Dialog header="Ask for a loan" draggable={false} visible={visibleAsk} style={{ width: '50vw' }} onHide={() => setVisibleAsk(false)}>
                <AskForm />
            </Dialog>
            <Dialog header="Repay" draggable={false} visible={visibleRepay} style={{ width: '50vw' }} onHide={() => setVisibleRepay(false)}>
                <RepayForm loan={selectedLoan}/>
            </Dialog>
            <TopSection>
                <TopBlock>
                    <div className='icon'>
                        <FaDollarSign />
                    </div>
                    <div className='info'>
                        <span>${loans.reduce((ac, val) => { return ac + (+val.current_amount_wint) }, 0) | 0}</span>
                        <span>current debt</span>
                    </div>
                </TopBlock>
                <TopBlock>
                    <div className='icon'>
                        <FaFileSignature  />
                    </div>
                    <div className='info'>
                        <span>{loans.length}</span>
                        <span>active loans</span>
                    </div>
                </TopBlock>
                <TopBlock>
                    <div className='icon'>
                        <FaSubscript  />
                    </div>
                    <div className='info'>
                        <span>10%</span>
                        <span>annual interest fees</span>
                    </div>
                </TopBlock>
                <Button style={{ width: "25%", height: "100%", borderRadius: "10px" }} onClick={() => setVisibleAsk(true)}>Ask For a Loan</Button>
            </TopSection>
            <BottomSection>
                <NavMenu>
                    <span className={selected === 'current' ? "selected" : ""} onClick={() => setSelected("current")}>Current</span>
                </NavMenu>
                {selected === 'current' &&
                    <DataSection>
                        <DataTable paginator rows={5} value={loans} tableStyle={{ minWidth: '50rem' }}>
                            <Column field="created_at" header="Date" />
                            <Column field="collateral" header="Collateral" />
                            <Column field="lent_amount_wint" header="Initial Amount" />
                            <Column field="current_amount_wint" header="Current Debt" />
                            <Column
                                bodyStyle={{ textAlign: "center", overflow: "visible", width: '5%' }}
                                body={repayBodyTemplate}
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