import { Button, Modal, Stack, Grid, Text } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import React, { useContext, useState } from 'react'
import { useMediaQuery } from '@mantine/hooks'
import {useMutation} from 'react-query'
import UserDetailContext from '../Context/userDetailsContext'
import { bookVisit } from '../utils/api'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

const BookingModal = ({opened, setOpened, email, propertyId}) => {
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const isMobile = useMediaQuery('(max-width: 768px)')

    const {userDetail:{token}, setUserDetail}= useContext(UserDetailContext)
   
    
    // Gerar opções de horário entre 9am e 4pm
    const timeSlots = [
      { value: '9:00', label: '9:00 AM' },
      { value: '10:00', label: '10:00 AM' },
      { value: '11:00', label: '11:00 AM' },
      { value: '12:00', label: '12:00 PM' },
      { value: '13:00', label: '1:00 PM' },
      { value: '14:00', label: '2:00 PM' },
      { value: '15:00', label: '3:00 PM' },
      { value: '16:00', label: '4:00 PM' }
    ]


    const handleBookingSuccess=()=>{
      toast.success('Your visit has be booked',{position:"bottom-right"})
      setUserDetail((prev)=>({
        ...prev, bookings:[
          ...prev.bookings,{id:propertyId, date:dayjs(date).format("DD/MM/YYYY"),time}
        ]
      }))
    }

    const {mutate, isLoading} =useMutation({
      mutationFn:()=> bookVisit(time, date, propertyId, email,token),
      onSuccess:()=> handleBookingSuccess(),
      onError:({response})=> toast.error(response.data.message),
      onSettled:()=>setOpened(false),
   }) 

    return (
      <Modal 
        opened={opened} 
        title="Select Your date to visit" 
        centered 
        onClose={()=>setOpened(false)}
        size={isMobile ? "sm" : "md"}
      >
        {/* Layout responsivo - vertical em mobile, horizontal em desktop */}
        <Stack spacing="md">
          {/* Calendário */}
          <DatePicker className='flexCenter'
            value={date} 
            onChange={setDate} 
            minDate={new Date()} 
            size="sm"
            styles={{
              calendar: { maxWidth: '100%' }
            }}
          />
          
          {/* Horários */}
          <div>
            <Text weight={500} size="sm" mb="xs">Select Time:</Text>
            <Grid gutter="xs">
              {timeSlots.map((slot) => (
                <Grid.Col span={isMobile ? 6 : 3} key={slot.value}>
                  <Button
                    variant={time === slot.value ? "filled" : "light"}
                    color={time === slot.value ? "blue" : "gray"}
                    onClick={() => setTime(slot.value)}
                    size="xs"
                    fullWidth
                  >
                    {slot.label}
                  </Button>
                </Grid.Col>
              ))}
            </Grid>
          </div>
        </Stack>
        
        <Button 
          disabled={!date || !time} 
          onClick={() => mutate({ date, time })}
          fullWidth
          mt="md"
          size="sm"
        >
          Book a visit
        </Button>
      </Modal>
    )
}

export default BookingModal