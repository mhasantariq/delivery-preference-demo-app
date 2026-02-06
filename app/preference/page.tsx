'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Store, Truck, Car, MapPin, Palette } from 'lucide-react';
import { usePreferenceStore, DeliveryPreference } from '@/lib/store/preference-store';
import { useRequireAuth } from '@/lib/hooks/use-require-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import DatePickerWidget from '@/components/ui/date-picker-widget';
import TimePickerWidget from '@/components/ui/time-picker-widget';
import RadioGroupCustom from '@/components/ui/radio-group-custom';
import { Card } from '@/components/ui/card';
import PageHeader from '@/components/PageHeader';
import StepIndicator from '@/components/ui/StepIndicator';
import { PageTransition } from '@/components/animations/PageTransition';

const preferenceSchema = z.object({
  preference: z.enum(['IN_STORE', 'DELIVERY', 'CURBSIDE']),
  address: z.string().optional(),
  deliveryDate: z.string().optional(),
  deliveryTime: z.string().optional(),
  carColor: z.string().optional(),
  pickupDate: z.string().optional(),
  pickupTime: z.string().optional(),
}).refine((data) => {
  if (data.preference === 'DELIVERY') {
    return data.address && data.deliveryDate && data.deliveryTime;
  }
  if (data.preference === 'CURBSIDE') {
    return data.carColor && data.pickupDate && data.pickupTime;
  }
  return true;
}, {
  message: 'Please fill all required fields',
  path: ['preference'],
}).superRefine((data, ctx) => {
  if (data.preference === 'DELIVERY') {
    if (!data.address) {
      ctx.addIssue({
        code: 'custom',
        message: 'Delivery address is required',
        path: ['address'],
      });
    }
    if (!data.deliveryDate) {
      ctx.addIssue({
        code: 'custom',
        message: 'Delivery date is required',
        path: ['deliveryDate'],
      });
    }
    if (!data.deliveryTime) {
      ctx.addIssue({
        code: 'custom',
        message: 'Delivery time is required',
        path: ['deliveryTime'],
      });
    }
    if (data.deliveryDate && data.deliveryTime) {
      const dateTime = new Date(`${data.deliveryDate}T${data.deliveryTime}`);
      if (dateTime <= new Date()) {
        ctx.addIssue({
          code: 'custom',
          message: 'Delivery date and time must be in the future',
          path: ['deliveryDate'],
        });
        ctx.addIssue({
          code: 'custom',
          message: 'Delivery date and time must be in the future',
          path: ['deliveryTime'],
        });
      }
    }
  }
  if (data.preference === 'CURBSIDE') {
    if (!data.carColor) {
      ctx.addIssue({
        code: 'custom',
        message: 'Car color is required',
        path: ['carColor'],
      });
    }
    if (!data.pickupDate) {
      ctx.addIssue({
        code: 'custom',
        message: 'Pickup date is required',
        path: ['pickupDate'],
      });
    }
    if (!data.pickupTime) {
      ctx.addIssue({
        code: 'custom',
        message: 'Pickup time is required',
        path: ['pickupTime'],
      });
    }
    if (data.pickupDate && data.pickupTime) {
      const dateTime = new Date(`${data.pickupDate}T${data.pickupTime}`);
      if (dateTime <= new Date()) {
        ctx.addIssue({
          code: 'custom',
          message: 'Pickup date and time must be in the future',
          path: ['pickupDate'],
        });
        ctx.addIssue({
          code: 'custom',
          message: 'Pickup date and time must be in the future',
          path: ['pickupTime'],
        });
      }
    }
  }
});

type PreferenceFormData = z.infer<typeof preferenceSchema>;

const deliveryOptions = [
  {
    value: 'IN_STORE',
    label: 'In-Store Pickup',
    description: 'Pick up your order at our store location',
    icon: <Store />,
  },
  {
    value: 'DELIVERY',
    label: 'Delivery',
    description: 'We will deliver to your address',
    icon: <Truck />,
  },
  {
    value: 'CURBSIDE',
    label: 'Curbside Pickup',
    description: 'Pick up your order curbside',
    icon: <Car />,
  },
];

export default function PreferencePage() {
  useRequireAuth();
  const router = useRouter();
  const {
    preference,
    address,
    deliveryDate,
    deliveryTime,
    carColor,
    pickupDate,
    pickupTime,
    setPreference,
    setAddress,
    setDeliveryDateTime,
    setCarColor,
    setPickupDateTime,
  } = usePreferenceStore();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PreferenceFormData>({
    resolver: zodResolver(preferenceSchema),
    defaultValues: {
      preference: preference || "IN_STORE",
      address: address || '',
      deliveryDate: deliveryDate || '',
      deliveryTime: deliveryTime || '',
      carColor: carColor || '',
      pickupDate: pickupDate || '',
      pickupTime: pickupTime || '',
    },
  });

  const selectedPreference = watch('preference');

  useEffect(() => {
    if (selectedPreference) {
      setPreference(selectedPreference as DeliveryPreference);
    }
  }, [selectedPreference, setPreference]);

  const onSubmit = async (data: PreferenceFormData) => {
    if (data.preference === 'DELIVERY') {
      setAddress(data.address!);
      setDeliveryDateTime(data.deliveryDate!, data.deliveryTime!);
    } else if (data.preference === 'CURBSIDE') {
      setCarColor(data.carColor!);
      setPickupDateTime(data.pickupDate!, data.pickupTime!);
    }

    await new Promise((r) => setTimeout(r, 600));
    router.push('/summary');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen px-4 py-12">
      <PageHeader />
      <PageTransition className="max-w-3xl mx-auto">
        <StepIndicator currentStep={1} steps={['Preferences', 'Summary']} />

        <Card className="p-8">
          <div className="flex gap-4 items-start mb-8">
            <div className="rounded-xl bg-primary/10 p-3 shrink-0">
              <Truck className="size-8 text-primary" aria-hidden />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">Delivery Preferences</h1>
              <p className="text-sm text-muted-foreground">Choose how you would like to receive your order</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Controller
              name="preference"
              control={control}
              render={({ field }) => (
                <RadioGroupCustom
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  options={deliveryOptions}
                  error={errors.preference?.message}
                  label="Select Delivery Method"
                />
              )}
            />

            {selectedPreference === 'DELIVERY' && (
              <div className="space-y-4 pt-6 border-t border-border">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 mb-2 cursor-help">
                        <MapPin className="size-5 text-primary" aria-hidden />
                        <span className="text-sm font-medium">Delivery details</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Provide your delivery address and preferred date/time</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Input
                  {...register('address')}
                  label="Delivery Address"
                  id="delivery-address"
                  placeholder="Street, city, and postal code"
                  error={errors.address?.message}
                  icon={<MapPin className="size-5" />}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name="deliveryDate"
                    control={control}
                    render={({ field }) => (
                      <DatePickerWidget
                        value={field.value}
                        onChange={field.onChange}
                        min={today}
                        label="Delivery Date"
                        error={errors.deliveryDate?.message}
                        placeholder="Pick a date"
                      />
                    )}
                  />
                  <Controller
                    name="deliveryTime"
                    control={control}
                    render={({ field }) => (
                      <TimePickerWidget
                        value={field.value}
                        onChange={field.onChange}
                        label="Delivery Time"
                        error={errors.deliveryTime?.message}
                        placeholder="Pick a time"
                      />
                    )}
                  />
                </div>
              </div>
            )}

            {selectedPreference === 'CURBSIDE' && (
              <div className="space-y-4 pt-6 border-t border-border">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 mb-2 cursor-help">
                        <Car className="size-5 text-primary" aria-hidden />
                        <span className="text-sm font-medium">Curbside details</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Provide your car color and preferred pickup date/time</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Input
                  {...register('carColor')}
                  id="car-color"
                  label="Car Color"
                  placeholder="e.g. Red, Silver, Black"
                  error={errors.carColor?.message}
                  icon={<Palette className="size-5" />}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name="pickupDate"
                    control={control}
                    render={({ field }) => (
                      <DatePickerWidget
                        value={field.value}
                        onChange={field.onChange}
                        min={today}
                        label="Pickup Date"
                        error={errors.pickupDate?.message}
                        placeholder="Pick a date"
                      />
                    )}
                  />
                  <Controller
                    name="pickupTime"
                    control={control}
                    render={({ field }) => (
                      <TimePickerWidget
                        value={field.value}
                        onChange={field.onChange}
                        label="Pickup Time"
                        error={errors.pickupTime?.message}
                        placeholder="Pick a time"
                      />
                    )}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-6">
              <Button
                type="submit"
                variant="default"
                loading={isSubmitting}
                className="flex-1"
                icon={!isSubmitting ? <Truck className="size-5" /> : undefined}
              >
                {isSubmitting ? 'Saving...' : 'Continue'}
              </Button>
            </div>
          </form>
        </Card>
      </PageTransition>
    </div>
  );
}
