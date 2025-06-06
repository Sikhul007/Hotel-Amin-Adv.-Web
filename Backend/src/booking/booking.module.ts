import { Module, forwardRef } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Accounts } from './entities/accounts.entity';
import { BookingHistory } from './entities/booking-history.entity';
import { UserModule } from '../user/user.module';
import { RoomModule } from '../room/room.module';
import { CouponModule } from '../coupon/coupon.module';
import { ManagementModule } from '../management/management.module';
import { HousekeepingModule } from '../housekeeping/housekeeping.module';
import { Customer } from './entities/customer.entity';
import { ReservationModule } from '../reservation/reservation.module';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { RestaurantHistory } from '../restaurant/entities/restaurant-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accounts, Booking,BookingHistory,Customer, RestaurantHistory]),
  forwardRef(() => UserModule),
  forwardRef(() =>RoomModule),
  forwardRef(() =>CouponModule),
  forwardRef(() =>ReservationModule),
  forwardRef(() =>RestaurantModule),
  ManagementModule,HousekeepingModule,
  ],

  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService,TypeOrmModule],
})
export class BookingModule {}
 