'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Package, Pencil } from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth-store';
import { usePreferenceStore } from '@/lib/store/preference-store';
import { useRequireAuth } from '@/lib/hooks/use-require-auth';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import StepIndicator from '@/components/ui/StepIndicator';
import SummarySuccess from '@/components/illustrations/SummarySuccess';
import CalendarTimeCard from '@/components/ui/CalendarTimeCard';
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/animations/PageTransition';

export default function SummaryPage() {
  useRequireAuth();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const email = useAuthStore((state) => state.email);
  const {
    preference,
    address,
    deliveryDate,
    deliveryTime,
    carColor,
    pickupDate,
    pickupTime,
  } = usePreferenceStore();

  const getPreferenceLabel = (pref: string) => {
    switch (pref) {
      case 'IN_STORE':
        return 'In-Store Pickup';
      case 'DELIVERY':
        return 'Delivery';
      case 'CURBSIDE':
        return 'Curbside Pickup';
      default:
        return pref;
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <PageHeader />
      <PageTransition className="max-w-3xl mx-auto">
        <StepIndicator currentStep={2} steps={['Preferences', 'Summary']} />

        <Card className="p-4 md:p-8">

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
            <SummarySuccess className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 mx-auto sm:mx-0" />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">All set</h1>
              <p className="text-sm text-muted-foreground">Review your delivery preferences below</p>
            </div>
          </div>

          <StaggerContainer className="space-y-5">
            <StaggerItem>
              <div className="p-6 bg-muted rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <User className="size-5 text-primary" aria-hidden />
                  </div>
                  <h2 className="text-lg font-semibold">Account Information</h2>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{email}</span>
                  </div>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 bg-muted rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Package className="size-5 text-primary" aria-hidden />
                  </div>
                  <h2 className="text-lg font-semibold">Delivery Preference</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Method:</span>
                    <span className="font-medium">
                      {preference ? getPreferenceLabel(preference) : 'Not selected'}
                    </span>
                  </div>

                  {preference === 'DELIVERY' && (
                    <>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span className="text-muted-foreground">Address:</span>
                        <span className="font-medium text-right max-w-xs">
                          {address}
                        </span>
                      </div>
                      {deliveryDate && deliveryTime && (
                        <div>
                          <span className="block text-muted-foreground text-sm mb-2">Delivery date & time</span>
                          <CalendarTimeCard date={deliveryDate} time={deliveryTime} label="Scheduled for" />
                        </div>
                      )}
                    </>
                  )}

                  {preference === 'CURBSIDE' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Car Color:</span>
                        <span className="font-medium">{carColor}</span>
                      </div>
                      {pickupDate && pickupTime && (
                        <div>
                          <span className="block text-muted-foreground text-sm mb-2">Pickup date & time</span>
                          <CalendarTimeCard date={pickupDate} time={pickupTime} label="Scheduled for" />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="default"
                  onClick={() => router.push('/preference')}
                  className="w-full"
                  icon={<Pencil className="size-5" />}
                >
                  Edit Preferences
                </Button>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </Card>
      </PageTransition>
    </div>
  );
}
